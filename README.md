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
