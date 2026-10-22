import type { ValidateCustomerBody } from "../types/customer.js";

export function getCustomerValidationFixture(
  env: NodeJS.ProcessEnv,
): { customerCode: string; body: ValidateCustomerBody } | undefined {
  const optional = [
    "PAYSTACK_VALIDATION_CUSTOMER_CODE",
    "PAYSTACK_VALIDATION_BVN",
    "PAYSTACK_VALIDATION_FIRST_NAME",
    "PAYSTACK_VALIDATION_LAST_NAME",
  ];
  if (!optional.some((name) => env[name]?.trim())) return undefined;

  const required = [
    ...optional,
    "MY_ACCT_NUMBER",
    "MY_BANK_CODE",
    "MY_COUNTRY_CODE",
  ];
  const missing = required.filter((name) => !env[name]?.trim());
  if (missing.length) {
    throw new Error(
      `Missing customer validation fixture: ${missing.join(", ")}`,
    );
  }

  return {
    customerCode: env.PAYSTACK_VALIDATION_CUSTOMER_CODE!.trim(),
    body: {
      type: "bank_account",
      country: env.MY_COUNTRY_CODE!.trim(),
      account_number: env.MY_ACCT_NUMBER!.trim(),
      bank_code: env.MY_BANK_CODE!.trim(),
      bvn: env.PAYSTACK_VALIDATION_BVN!.trim(),
      value: env.PAYSTACK_VALIDATION_BVN!.trim(),
      first_name: env.PAYSTACK_VALIDATION_FIRST_NAME!.trim(),
      last_name: env.PAYSTACK_VALIDATION_LAST_NAME!.trim(),
    },
  };
}

export function validateIntegrationEnv(env: NodeJS.ProcessEnv): void {
  if (env.RUN_PAYSTACK_INTEGRATION !== "1") {
    throw new Error(
      "Set RUN_PAYSTACK_INTEGRATION=1 to opt in to real Paystack test-mode requests.",
    );
  }
  if (!env.SECRET_KEY?.startsWith("sk_test_")) {
    throw new Error(
      "Integration tests require a Paystack sk_test_ SECRET_KEY.",
    );
  }
  const required = [
    "MY_ACCT_NAME",
    "MY_ACCT_NUMBER",
    "MY_ACCT_TYPE",
    "MY_BANK_CODE",
    "MY_COUNTRY_CODE",
    "MY_DOCUMENT_TYPE",
    "MY_DOCUMENT_NUMBER",
    "MY_CARD_BIN",
  ];
  const missing = required.filter((name) => !env[name]?.trim());
  if (missing.length) {
    throw new Error(`Missing integration variables: ${missing.join(", ")}`);
  }
}
