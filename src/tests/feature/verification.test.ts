import { describe, expect, it } from "vitest";
import { Paystack } from "../../main.js";
describe("Feature Tests for Verification", () => {
  const paystack = new Paystack(process.env.SECRET_KEY as string);

  it("Correctly resolves an account", async () => {
    const queries = {
      account_number: process.env.MY_ACCT_NUMBER as string,
      bank_code: process.env.MY_BANK_CODE as string,
    };

    const response = await paystack.verification.resolveAccount(queries);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Account number resolved");
      expect(response.data).toBeDefined();
    }
  });

  it("Correctly validates an account", async () => {
    const body = {
      account_name: process.env.MY_ACCT_NAME!,
      account_number: process.env.MY_ACCT_NUMBER!,
      account_type: process.env.MY_ACCT_TYPE! as "personal" | "business",
      bank_code: process.env.MY_BANK_CODE!,
      country_code: process.env.MY_COUNTRY_CODE!,
      document_type: process.env.MY_DOCUMENT_TYPE! as
        "identityNumber" | "passportNumber" | "businessRegistrationNumber",
      document_number: process.env.MY_DOCUMENT_NUMBER!,
    };

    const response = await paystack.verification.validateAccount(body);

    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe(
        "Account Validation is not supported in this country",
      );
      expect(response.data).not.toBeDefined();
    }
  });

  it("Correctly resolves a BIN", async () => {
    const bin = process.env.MY_CARD_BIN as string;

    const response = await paystack.verification.resolveBin(bin);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Bin resolved");
      expect(response.data).toHaveProperty("bin", bin);
      expect(response.data).toHaveProperty("brand");
      expect(response.data).toHaveProperty("bank");
    }
  });
});
