const sdk = require("@stradox/paystack");
const verify = require("./verify.cjs");

verify(sdk).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
