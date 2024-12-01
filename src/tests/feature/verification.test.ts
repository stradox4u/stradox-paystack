import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { expect } from "@std/expect";

describe("Feature Tests for Verification", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);

  it("Correctly resolves an account", async () => {
    const queries = {
      account_number: Deno.env.get("MY_ACCT_NUMBER") as string,
      bank_code: Deno.env.get("MY_BANK_CODE") as string,
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
      account_name: Deno.env.get("MY_ACCT_NAME")!,
      account_number: Deno.env.get("MY_ACCT_NUMBER")!,
      account_type: Deno.env.get("MY_ACCT_TYPE")! as ("personal" | "business"),
      bank_code: Deno.env.get("MY_BANK_CODE")!,
      country_code: Deno.env.get("MY_COUNTRY_CODE")!,
      document_type: Deno.env.get(
        "MY_DOCUMENT_TYPE",
      )! as (
        | "identityNumber"
        | "passportNumber"
        | "businessRegistrationNumber"
      ),
      document_number: Deno.env.get("MY_DOCUMENT_NUMBER")!,
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
    const bin = Deno.env.get("MY_CARD_BIN") as string;

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
