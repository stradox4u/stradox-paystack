---
status: accepted
---

# Select the Webhook signature scheme by credential

A verifier configured with a Webhook signing secret requires a valid `Paystack-Signature` header. A missing or invalid current header causes verification to fail even when the legacy header is valid, so the timestamp check applies to every accepted delivery in this configuration. An instance configured with only a Secret key verifies `X-Paystack-Signature` during migration.

Each verifier holds one Webhook signing secret and checks every `v1` signature in the header. During Paystack's rotation overlap, instances using either active signing secret can verify the same Webhook.

The client accepts the signing secret through `webhook.signingSecret`. A service that only receives Webhooks can use `createWebhookVerifier({ signingSecret })` with just the signing secret. Both entry points take the signature headers by their HTTP names in `verify({ rawBody, headers, ip })`.
