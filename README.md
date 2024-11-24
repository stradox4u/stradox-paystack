# PAYSTACK-API
This is a Typescript wrapper for the [Paystack API](https://paystack.com/docs/api/), providing strongly typed interfaces and methods for interacting with the API.

The aim is to simplify the process of integrating Paystack into your application by providing a simple and easy-to-use package, providing type-hinting and autocompletion in your IDE.

It is built using [Deno](https://deno.land/), and can be used in Deno, Node.js, or any other JavaScript runtime (server side) that supports ES modules.

## Installation
To install the package, run one of the following commands in your terminal, depending upon your package manager:

*Deno*
```bash
  $ deno add jsr:@stradox/paystack
```

*Npm*
```bash
  $ npx jsr add @stradox/paystack
```

*Yarn*
```bash
  $ yarn dlx jsr add @stradox/paystack
```

*Pnpm*
```bash
  $ pnpm dlx jsr add @stradox/paystack
```

*Bun*
```bash
  $ bunx jsr add @stradox/paystack
```

## Usage
To use the package, import the `Paystack` class from the package and create an instance of it, passing your secret key as an argument. You can then call the various methods on the instance to interact with the Paystack API.

```typescript
import { Paystack } from '@stradox/paystack';

const paystack = new Paystack(<your_secret_key>);

const transaction = await paystack.transaction.initialize({
  amount: 10000,
  email: "johndoe@test.com",
});
```

Alternatively, you can use the exported `getPaystack` function to create an instance of the `Paystack` class, passing your secret key as an argument. This directly returns a singleton, if you would find that useful.

```typescript
import { getPaystack } from '@stradox/paystack';

const paystack = getPaystack(<your_secret_key>);

const transaction = await paystack.transaction.initialize({
 amount: 10000,
 email: "johndoe@test.com",
});
```

### Methods
The following methods are exposed by the `Paystack` class:
* applePay
  * register
  * list
  * unregister
* bulkCharge
  * initiate
  * listBatches
  * fetchBatch
  * fetchCharges
  * pauseBatch
  * resumeBatch
* charge
  * create
  * submitPin
  * submitOtp
  * submitPhone
  * submitBirthday
  * submitAddress
  * checkPending
* customer
  * create
  * list
  * fetch
  * update
  * validate
  * whiteOrBlacklist
  * deactivateAuthorization
* dispute
  * list
  * fetch
  * listTransactionDisputes
  * update
  * addEvidence
  * getUploadUrl
  * resolve
  * export
* integration
  * fetchTimeout
  * updateTimeout
* misc
  * listBanks
  * listCountries
  * listStates
* paymentPage
  * create
  * list
  * fetch
  * update
  * checkSlugAvailability
  * addProducts
* paymentRequest
  * create
  * list
  * fetch
  * verify
  * sendNotification
  * requestTotal
  * finalize
  * update
  * archive
* plan
  * create
  * list
  * fetch
  * update
* product
  * create
  * list
  * fetch
  * update
* recipient
  * create
  * bulkCreate
  * list
  * fetch
  * update
  * delete
* refund
  * create
  * list
  * fetch
* settlement
  * list
  * listTransactions
* split
  * create
  * list
  * fetch
  * update
  * addSubaccountSplit
  * removeSubaccountSplit
* subaccount
  * create
  * list
  * fetch
  * update
* subscription
  * create
  * list
  * fetch
  * enable
  * disable
  * generateLink
  * sendLink
* terminal
  * sendEvent
  * fetchEventStatus
  * fetchStatus
  * list
  * fetch
  * update
  * commission
  * decommission
* transaction
  * initialize
  * verify
  * list
  * fetch
  * chargeAuthorization
  * timeline
  * totals
  * export
  * partialDebit
* transfer
  * initiate
  * finalize
  * initiateBulk
  * list
  * fetch
  * verify
* transferControl
  * checkBalance
  * fetchLedger
  * resendOtp
  * disableOtp
  * finalizeDisableOtp
  * enableOtp
* verification
  * resolveAccount
  * validateAccount
  * resolveBin
* virtualAccount
  * create
  * assign
  * list
  * fetch
  * requery
  * deactivate
  * split
  * removeSplit
  * fetchProviders

## Testing
To run the full test suite (unit and feature tests) locally, you first need to copy the `.env.example` file to `.env` and fill in the required environment variables. `SECRET_KEY` should be a valid Paystack API secret key. You can then run the following command to run the tests:

```bash
  $ deno test --env-file --allow-net --allow-env
```
Alternatively, if you do not wish to use your valid Paystack API credentials, you can run only the unit tests by setting the `SECRET_KEY` environment variable to a dummy value, and then using the following command:

```bash
  $ deno test src/tests/unit --env-file --allow-net --allow-env

```

## Contributing
If you would like to contribute to the project, please fork the repository and submit a pull request. You can also open an issue if you have any suggestions, experience any bugs or have feedback.