import type { PaystackEvent } from "./events.js";

export type WebhookOptions =
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

export interface VerifyWebhookInput {
  /** The request body exactly as Paystack sent it, before any JSON parsing */
  rawBody: string | Uint8Array;
  /** The value of the `x-paystack-signature` header */
  signature: string | string[] | null | undefined;
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
