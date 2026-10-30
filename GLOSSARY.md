# Paystack client

A typed Node.js client for the Paystack API: making calls to Paystack, and checking the Events Paystack sends back.

## Language

### Integrations

**Integration**:
Your business's account on Paystack. Every Event and API call belongs to one Integration.
_Avoid_: Account, business

**Mode**:
Whether something happened under test keys or live keys. Paystack's payloads call this the `domain`.
_Avoid_: Domain, environment

### Webhooks

**Event**:
A signed message Paystack sends to your server when something happens on your integration, such as a successful charge.
_Avoid_: Webhook payload, notification, callback

**Event type**:
The name that says what an Event is about, such as `charge.success` or `transfer.failed`.

**Webhook**:
The delivery of an Event to the URL set on your Paystack dashboard.
_Avoid_: Callback

**Secret key**:
The key that authenticates your API calls and that Paystack signs Events with. Test mode and live mode each have their own.
_Avoid_: Webhook secret, signing secret

**IP allowlist**:
The Paystack IP addresses that Webhooks are sent from. Requests from any other address are treated as forged.
_Avoid_: Whitelist, IP whitelist

### Payments

**Risk action**:
A Customer's standing with Paystack's fraud checks: allowed (Paystack's "whitelist"), denied (Paystack's "blacklist"), or default.

**Callback URL**:
The page Paystack sends a customer's browser to after they pay.
