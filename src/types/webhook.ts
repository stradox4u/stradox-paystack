import type { PaystackEvent } from "./events.js";

type WebhookIpOptions =
  | {
      /** Only accept Webhooks sent from an address on the IP allowlist */
      checkIp: true;
      /** Replaces Paystack's published IP addresses when supplied */
      ipAllowlist?: readonly string[];
    }
  | {
      checkIp?: false;
      ipAllowlist?: never;
    };

export type WebhookOptions = WebhookIpOptions & {
  /** The `whsec_` credential for the current signing scheme. */
  signingSecret?: string;
};

export type WebhookVerifierOptions = WebhookIpOptions & {
  /** The `whsec_` credential for the current signing scheme. */
  signingSecret: string;
};

type SignatureHeaderValue = string | readonly string[] | null | undefined;

export interface WebhookSignatureHeaders {
  "paystack-signature"?: SignatureHeaderValue;
  "x-paystack-signature"?: SignatureHeaderValue;
}

export interface VerifyWebhookInput {
  /** The request body exactly as Paystack sent it, before any JSON parsing */
  rawBody: string | Uint8Array;
  /** Signature headers keyed by their lowercase HTTP names */
  headers: WebhookSignatureHeaders;
  /** The address the request came from. Only used when `checkIp` is on. */
  ip?: string;
}

export type WebhookFailureReason =
  | "missing_ip"
  | "ip_not_allowlisted"
  | "missing_signature"
  | "invalid_signature"
  | "invalid_payload";

export type VerifyWebhookResult =
  | { status: true; event: PaystackEvent }
  | { status: false; reason: WebhookFailureReason; message: string };

export interface WebhookVerifier {
  verify(input: VerifyWebhookInput): VerifyWebhookResult;
}
