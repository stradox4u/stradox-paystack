# PAYSTACK-API

This is a Typescript wrapper for the [Paystack API](https://paystack.com/docs/api/), providing strongly typed interfaces and methods for interacting with the API.

The aim is to simplify the process of integrating Paystack into your application by providing a simple and easy-to-use package, providing type-hinting and autocompletion in your IDE.

A Node.js library with native `fetch`, no runtime dependencies, and TypeScript declarations for both module formats. Use it on the server with your Paystack secret key.

## Installation

Requires Node.js 22 or newer. Supports both ESM and CommonJS.

```bash
npm install @stradox/paystack
# or: pnpm add @stradox/paystack
# or: yarn add @stradox/paystack
# or: bun add @stradox/paystack
```

## Usage

To use the package, import the `Paystack` class from the package and create an instance of it, passing your secret key as an argument. You can then call the various methods on the instance to interact with the Paystack API.

```typescript
import { Paystack } from "@stradox/paystack";

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!);

const transaction = await paystack.transaction.initialize({
  amount: 10000,
  email: "johndoe@test.com",
});
```

Alternatively, you can use the exported `getPaystack` function to create an instance of the `Paystack` class, passing your secret key as an argument. This directly returns a singleton, if you would find that useful.

```typescript
import { getPaystack } from "@stradox/paystack";

const paystack = getPaystack(process.env.PAYSTACK_SECRET_KEY!);

const transaction = await paystack.transaction.initialize({
  amount: 10000,
  email: "johndoe@test.com",
});
```

CommonJS is supported as well:

```javascript
const { Paystack, getPaystack } = require("@stradox/paystack");
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);
```

`getPaystack` keeps the first client instance within each loaded module format.
Use `new Paystack(secretKey)` when working with multiple Paystack accounts.

### Webhooks

Paystack sends Events, such as `charge.success`, to your webhook URL.
`paystack.webhook.verify()` checks that a request came from Paystack and returns
the Event, with its data typed for each Event type.

Pass the request body exactly as Paystack sent it. The signature covers the raw
bytes, so a body that has been parsed into JSON can't be verified.

Set `webhook.signingSecret` to the `whsec_` credential for your test or live Mode.
The verifier then requires `Paystack-Signature` and checks that its timestamp is
within five minutes of the server clock. A client configured with only the API
secret key verifies the deprecated `X-Paystack-Signature` header. Pass both header
values by name so the verifier can read the one it requires.

```typescript
import express from "express";
import { Paystack } from "@stradox/paystack";

const signingSecret = process.env.PAYSTACK_WEBHOOK_SIGNING_SECRET;
if (!signingSecret) throw new Error("Set PAYSTACK_WEBHOOK_SIGNING_SECRET");

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!, {
  webhook: { signingSecret },
});
const app = express();

app.post(
  "/webhooks/paystack",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const result = paystack.webhook.verify({
      rawBody: req.body, // a Buffer, because of express.raw()
      headers: {
        "paystack-signature": req.headers["paystack-signature"],
        "x-paystack-signature": req.headers["x-paystack-signature"],
      },
    });
    if (!result.status) {
      console.warn(result.reason, result.message);
      return res.sendStatus(401);
    }

    const { event } = result;
    switch (event.event) {
      case "charge.success":
        // event.data is typed as ChargeSuccessEventData
        break;
      case "transfer.failed":
        // event.data is typed as TransferFailedEventData
        break;
      default:
        // Paystack can add Event types after this version was released.
        // Acknowledge them rather than throwing.
        break;
    }
    res.sendStatus(200);
  },
);
```

For a webhook-only service, use the standalone verifier with the same
`.verify({ rawBody, headers, ip })` interface and an independent signing secret.

```typescript
import { createWebhookVerifier } from "@stradox/paystack";

const signingSecret = process.env.PAYSTACK_WEBHOOK_SIGNING_SECRET;
if (!signingSecret) throw new Error("Set PAYSTACK_WEBHOOK_SIGNING_SECRET");

const webhook = createWebhookVerifier({ signingSecret });
```

Each verifier uses one signing secret. During rotation, Paystack includes a
signature for each active secret, so instances configured with either secret can
verify the same delivery. Deploy the new secret before the overlap ends.
[Paystack's signing guide](https://paystack.com/docs/v2/developer-tools/integration/webhooks#verify-webhook-signatures)

For other frameworks, pass the same signature headers by lowercase name.

- **Fetch-style handlers** (Next.js route handlers, Hono, Bun): pass
  `new Uint8Array(await request.arrayBuffer())` as `rawBody`. Read the signature
  values with `request.headers.get("paystack-signature")` and
  `request.headers.get("x-paystack-signature")`.
- **NestJS:** create the app with `NestFactory.create(AppModule, { rawBody: true })`
  and pass `req.rawBody`. `@Post()` responds with `201` by default, so add
  `@HttpCode(200)` to the webhook route.

When `status` is `false`, check `reason`.

| `reason`             | Meaning                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `missing_signature`  | The required header is absent, or the required `X-Paystack-Signature` header is empty.        |
| `invalid_signature`  | The required header failed verification. An empty `Paystack-Signature` also fails this check. |
| `invalid_payload`    | The body is correctly signed but isn't a Paystack Event.                                      |
| `missing_ip`         | IP checking is on, but no `ip` was passed.                                                    |
| `ip_not_allowlisted` | The request came from an address that isn't on the IP allowlist.                              |

`verify()` never throws for a bad request. It only throws a `TypeError` when
`rawBody` isn't a string or `Uint8Array` (such as a `Buffer`), which means the
body was parsed before it reached `verify()`.

Handling Events well:

- Respond with `200` quickly. Paystack retries failed deliveries for up to 72
  hours, so move slow work to a queue.
- Paystack can deliver the same Event more than once. Make handlers safe to run
  twice, for example by recording the references you've processed.
- Before fulfilling an order, confirm the payment with
  `paystack.transaction.verify(reference)`.
- Keep a `default` branch when switching on `event.event`, and don't throw from
  it.

#### IP allowlist

Paystack sends Webhooks from `52.31.139.75`, `52.49.173.169` and
`52.214.14.220`, in both test and live mode. Paystack's documentation calls this
IP whitelisting. Turn on `checkIp` and pass the request's IP address to check
the allowlist.

```typescript
const webhook = createWebhookVerifier({ signingSecret, checkIp: true });

const result = webhook.verify({ rawBody, headers, ip: req.ip });
```

If your app runs behind a proxy or load balancer, configure it to report the
client's address (for example, Express's `trust proxy` setting). Otherwise every
Webhook is rejected as `ip_not_allowlisted`.

Supply `ipAllowlist` to replace the built-in list. The Paystack client accepts
these options under `webhook`.

```typescript
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!, {
  webhook: {
    signingSecret,
    checkIp: true,
    ipAllowlist: ["52.31.139.75", "52.49.173.169"],
  },
});
```

Verifier setup throws a `TypeError` for an invalid signing secret or IP allowlist.
With `getPaystack`, options only apply on the first call.

### Upgrading to 1.0.0

- Install directly from npm; JSR publishing is paused.
- Existing npm users keep the same package name, imports, and resource methods.
- JSR users should remove the JSR dependency or npm alias, then install
  `@stradox/paystack` from npm.
- Node.js 22+ is now required. ESM and CommonJS both remain supported.

### Methods

The following methods are exposed by the `Paystack` class:

- applePay
  - register
  - list
  - unregister
- bulkCharge
  - initiate
  - listBatches
  - fetchBatch
  - fetchCharges
  - pauseBatch
  - resumeBatch
- charge
  - create
  - submitPin
  - submitOtp
  - submitPhone
  - submitBirthday
  - submitAddress
  - checkPending
- customer
  - create
  - list
  - fetch
  - update
  - validate
  - whiteOrBlacklist
  - deactivateAuthorization
- dispute
  - list
  - fetch
  - listTransactionDisputes
  - update
  - addEvidence
  - getUploadUrl
  - resolve
  - export
- integration
  - fetchTimeout
  - updateTimeout
- misc
  - listBanks
  - listCountries
  - listStates
- paymentPage
  - create
  - list
  - fetch
  - update
  - checkSlugAvailability
  - addProducts
- paymentRequest
  - create
  - list
  - fetch
  - verify
  - sendNotification
  - requestTotal
  - finalize
  - update
  - archive
- plan
  - create
  - list
  - fetch
  - update
- product
  - create
  - list
  - fetch
  - update
- recipient
  - create
  - bulkCreate
  - list
  - fetch
  - update
  - delete
- refund
  - create
  - list
  - fetch
- settlement
  - list
  - listTransactions
- split
  - create
  - list
  - fetch
  - update
  - addSubaccountSplit
  - removeSubaccountSplit
- subaccount
  - create
  - list
  - fetch
  - update
- subscription
  - create
  - list
  - fetch
  - enable
  - disable
  - generateLink
  - sendLink
- terminal
  - sendEvent
  - fetchEventStatus
  - fetchStatus
  - list
  - fetch
  - update
  - commission
  - decommission
- transaction
  - initialize
  - verify
  - list
  - fetch
  - chargeAuthorization
  - timeline
  - totals
  - export
  - partialDebit
- transfer
  - initiate
  - finalize
  - initiateBulk
  - list
  - fetch
  - verify
- transferControl
  - checkBalance
  - fetchLedger
  - resendOtp
  - disableOtp
  - finalizeDisableOtp
  - enableOtp
- verification
  - resolveAccount
  - validateAccount
  - resolveBin
- virtualAccount
  - create
  - assign
  - list
  - fetch
  - requery
  - deactivate
  - split
  - removeSplit
  - fetchProviders
- webhook
  - verify

## Development and testing

Use Node.js 24 for development (`nvm use`), then:

```bash
npm ci
npm run check          # formatting, lint, source/test type checks, offline tests
npm run build          # ESM, CommonJS, declarations, source maps
npm run test:package   # pack and verify JS/TS consumers without network access
```

The default test suite uses dummy keys and mocks every request; no `.env` or
Paystack credentials are needed. `npm run test:watch` starts watch mode.

### Paystack integration tests

These tests make real requests to Paystack test mode and can create or update
resources and account settings. Some cases depend on earlier cases and run
sequentially. Account capabilities, existing records, and API messages can affect
results.

Copy `.env.example` to `.env` and fill in its variables using a dedicated Paystack
test account. Explicitly opt in when running:

```bash
RUN_PAYSTACK_INTEGRATION=1 npm run test:integration
```

The command requires an `sk_test_` secret and validates required variables before
running. Integration tests are excluded from ordinary CI and release jobs.

The customer identity-verification case uses an optional persistent fixture.
Set `PAYSTACK_VALIDATION_CUSTOMER_CODE`, `PAYSTACK_VALIDATION_BVN`,
`PAYSTACK_VALIDATION_FIRST_NAME`, and `PAYSTACK_VALIDATION_LAST_NAME` in `.env`,
with matching `MY_ACCT_NUMBER`, `MY_BANK_CODE`, and `MY_COUNTRY_CODE`. Use the same
customer across runs; the old hardcoded BVN eventually exceeded Paystack's limit
when associated with a new customer on each run. If all four optional values are
empty, only this case is skipped; incomplete fixture configuration fails clearly.

To run a single file, pass its path:

```bash
RUN_PAYSTACK_INTEGRATION=1 npm run test:integration -- src/tests/feature/customer.test.ts
```

## Releasing

See [RELEASE.md](RELEASE.md) and the tracked [1.0.0 checklist](RELEASE_CHECKLIST.md).

## Contributing

Fork the repository, run `npm run check` and `npm run test:package`, and submit a
pull request. Issues and feedback are welcome.
