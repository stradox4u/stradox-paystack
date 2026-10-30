import { createHmac, timingSafeEqual } from "node:crypto";
import { isIP } from "node:net";
import type { PaystackEvent } from "../types/events.js";
import type {
  VerifyWebhookInput,
  VerifyWebhookResult,
  WebhookFailureReason,
  WebhookOptions,
} from "../types/webhook.js";

/**
 * The addresses Paystack sends Webhooks from, in both test and live mode
 */
const PAYSTACK_IP_ALLOWLIST = [
  "52.31.139.75",
  "52.49.173.169",
  "52.214.14.220",
];

/**
 * This class contains methods for checking the Webhooks Paystack sends to your server
 */
export default class Webhook {
  private readonly secretKey: string;
  private readonly ipAllowlist: readonly string[] | null;

  constructor(secretKey: string, options: WebhookOptions = {}) {
    this.secretKey = secretKey;
    this.ipAllowlist = buildIpAllowlist(options);
  }

  /**
   * @function verify
   * Check that a Webhook came from Paystack, and return the Event it carries
   * @param input
   * @returns {VerifyWebhookResult} result - `status: true` with the Event, or `status: false` with the reason the Webhook was rejected
   */
  public verify = ({
    rawBody,
    signature,
    ip,
  }: VerifyWebhookInput): VerifyWebhookResult => {
    if (typeof rawBody !== "string" && !(rawBody instanceof Uint8Array)) {
      throw new TypeError(
        "rawBody must be the request body exactly as Paystack sent it, as a string or Uint8Array (such as a Buffer). A parsed JSON body can't be verified.",
      );
    }

    if (this.ipAllowlist) {
      if (!ip) {
        return failure(
          "missing_ip",
          "IP checking is on, but no ip was passed to webhook.verify(). Pass the address the request came from, or turn off checkIp.",
        );
      }
      if (!this.ipAllowlist.includes(normalizeIp(ip))) {
        return failure(
          "ip_not_allowlisted",
          `The request came from ${ip}, which is not on the IP allowlist. Behind a proxy or load balancer, make sure you pass the client's address, not the proxy's.`,
        );
      }
    }

    if (
      signature === undefined ||
      signature === null ||
      signature.length === 0
    ) {
      return failure(
        "missing_signature",
        "The request has no x-paystack-signature header.",
      );
    }
    if (
      typeof signature !== "string" ||
      !this.verifySignature(rawBody, signature)
    ) {
      return failure(
        "invalid_signature",
        "The x-paystack-signature header doesn't match the request body. Check that you're passing the raw body exactly as received, and the secret key for the right mode (test or live).",
      );
    }

    const event = parseEvent(rawBody);
    if (!event) {
      return failure(
        "invalid_payload",
        "The request is correctly signed, but its body isn't a Paystack Event.",
      );
    }
    return { status: true, event };
  };

  private verifySignature(
    rawBody: string | Uint8Array,
    signature: string,
  ): boolean {
    const expected = Buffer.from(
      createHmac("sha512", this.secretKey).update(rawBody).digest("hex"),
    );
    const received = Buffer.from(signature);
    return (
      expected.length === received.length && timingSafeEqual(expected, received)
    );
  }
}

function buildIpAllowlist(options: WebhookOptions): readonly string[] | null {
  const { checkIp, ipAllowlist } = options;
  if (!checkIp) {
    if (ipAllowlist !== undefined) {
      throw new TypeError(
        "webhook.ipAllowlist only applies when webhook.checkIp is true.",
      );
    }
    return null;
  }
  if (ipAllowlist === undefined) {
    return PAYSTACK_IP_ALLOWLIST;
  }
  if (!Array.isArray(ipAllowlist) || ipAllowlist.length === 0) {
    throw new TypeError(
      "webhook.ipAllowlist must be a list of at least one IP address. Leave it out to use Paystack's addresses.",
    );
  }
  for (const entry of ipAllowlist) {
    if (typeof entry !== "string" || isIP(entry) === 0) {
      throw new TypeError(
        `webhook.ipAllowlist contains ${JSON.stringify(entry)}, which is not an IP address.`,
      );
    }
  }
  return ipAllowlist.map(normalizeIp);
}

/**
 * Node reports IPv4 clients on a dual-stack socket as `::ffff:<IPv4>`
 */
function normalizeIp(ip: string): string {
  const mapped = /^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i.exec(ip);
  return mapped ? mapped[1] : ip;
}

function parseEvent(rawBody: string | Uint8Array): PaystackEvent | null {
  const text =
    typeof rawBody === "string" ? rawBody : new TextDecoder().decode(rawBody);
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return null;
  }
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    typeof (parsed as { event?: unknown }).event !== "string"
  ) {
    return null;
  }
  return parsed as PaystackEvent;
}

function failure(
  reason: WebhookFailureReason,
  message: string,
): VerifyWebhookResult {
  return { status: false, reason, message };
}
