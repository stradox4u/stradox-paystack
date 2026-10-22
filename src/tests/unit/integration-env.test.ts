import { describe, expect, it } from "vitest";
import {
  getCustomerValidationFixture,
  validateIntegrationEnv,
} from "../integration-env.js";

const valid = {
  RUN_PAYSTACK_INTEGRATION: "1",
  SECRET_KEY: "sk_test_dummy",
  MY_ACCT_NAME: "Test Account",
  MY_ACCT_NUMBER: "0000000000",
  MY_ACCT_TYPE: "individual",
  MY_BANK_CODE: "057",
  MY_COUNTRY_CODE: "NG",
  MY_DOCUMENT_TYPE: "identityNumber",
  MY_DOCUMENT_NUMBER: "dummy",
  MY_CARD_BIN: "123456",
};

describe("Integration test safeguards", () => {
  it("requires explicit opt-in", () => {
    expect(() =>
      validateIntegrationEnv({ ...valid, RUN_PAYSTACK_INTEGRATION: "" }),
    ).toThrow("opt in");
  });
  it("rejects live credentials", () => {
    expect(() =>
      validateIntegrationEnv({ ...valid, SECRET_KEY: "sk_live_dummy" }),
    ).toThrow("sk_test_");
  });
  it("rejects missing credentials", () => {
    expect(() =>
      validateIntegrationEnv({ ...valid, SECRET_KEY: undefined }),
    ).toThrow("sk_test_");
  });
  it("reports missing variable names without exposing values", () => {
    expect(() =>
      validateIntegrationEnv({ ...valid, MY_BANK_CODE: " " }),
    ).toThrow("Missing integration variables: MY_BANK_CODE");
  });
  it("accepts a complete test-mode environment", () => {
    expect(() => validateIntegrationEnv(valid)).not.toThrow();
  });
});

describe("Persistent customer validation fixture", () => {
  it("leaves identity verification disabled when no fixture is configured", () => {
    expect(getCustomerValidationFixture(valid)).toBeUndefined();
  });

  it("rejects partial fixture configuration instead of silently skipping it", () => {
    expect(() =>
      getCustomerValidationFixture({
        ...valid,
        PAYSTACK_VALIDATION_CUSTOMER_CODE: "CUS_persistent_fixture",
      }),
    ).toThrow("PAYSTACK_VALIDATION_BVN");
  });

  it("uses the configured persistent customer and identity instead of random data", () => {
    expect(
      getCustomerValidationFixture({
        ...valid,
        PAYSTACK_VALIDATION_CUSTOMER_CODE: "CUS_persistent_fixture",
        PAYSTACK_VALIDATION_BVN: "00000000000",
        PAYSTACK_VALIDATION_FIRST_NAME: "Fixture",
        PAYSTACK_VALIDATION_LAST_NAME: "Customer",
      }),
    ).toEqual({
      customerCode: "CUS_persistent_fixture",
      body: {
        type: "bank_account",
        country: "NG",
        account_number: "0000000000",
        bank_code: "057",
        bvn: "00000000000",
        value: "00000000000",
        first_name: "Fixture",
        last_name: "Customer",
      },
    });
  });
});
