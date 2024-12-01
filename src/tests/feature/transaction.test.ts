import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { expect } from "@std/expect";

describe("Feature Tests for Transaction", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  let transactionId: number;
  let transactionRef: string;

  it("Correctly initializes a transaction", async () => {
    const body = {
      amount: 500_000,
      email: "johndoe@test.com",
    };

    const response = await paystack.transaction.initialize(body);

    if (response) {
      transactionRef = response.data.reference;
      expect(response.status).toBe(true);
      expect(response.message).toBe("Authorization URL created");
      expect(response.data).toHaveProperty("authorization_url");
      expect(response.data).toHaveProperty("access_code");
      expect(response.data).toHaveProperty("reference");
    }
  });

  it("Correctly verifies a transaction", async () => {
    const response = await paystack.transaction.verify(transactionRef);

    if (response) {
      transactionId = response.data.id;
      expect(response.status).toBe(true);
      expect(response.message).toBe("Verification successful");
      expect(response.data).toHaveProperty("id");
      expect(response.data).toHaveProperty("reference");
      expect(response.data).toHaveProperty("status");
    }
  });

  it("Correctly lists transactions", async () => {
    const queries = {
      perPage: 10,
      page: 1,
    };

    const response = await paystack.transaction.list(queries);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Transactions retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches a transaction", async () => {
    const response = await paystack.transaction.fetch(transactionId.toString());

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Transaction retrieved");
      expect(response.data).toHaveProperty("id", transactionId);
      expect(response.data).toHaveProperty("reference");
      expect(response.data).toHaveProperty("status");
    }
  });

  it("Correctly charges an authorization", async () => {
    const body = {
      amount: (20_000).toString(),
      email: "johndoe@test.com",
      authorization_code: "AUTH_72btv547",
    };

    const response = await paystack.transaction.chargeAuthorization(body);

    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe(
        "Email does not match Authorization code. Authorization may be inactive or belong to a different email. Please confirm.",
      );
    }
  });

  it("Correctly views transaction timeline", async () => {
    const response = await paystack.transaction.timeline(transactionRef);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Timeline retrieved");
    }
  });

  it("Correctly gets transaction totals", async () => {
    const queries = {
      perPage: 10,
      page: 1,
    };
    const response = await paystack.transaction.totals(queries);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Transaction totals");
      expect(response.data).toHaveProperty("total_transactions");
      expect(response.data).toHaveProperty("total_volume_by_currency");
      expect(response.data.total_volume_by_currency).toBeInstanceOf(Array);
    }
  });

  it("Correctly exports transactions", async () => {
    const queries = {
      perPage: 10,
      page: 1,
    };
    const response = await paystack.transaction.export(queries);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Export successful");
      expect(response.data).toHaveProperty("path");
      expect(response.data).toHaveProperty("expiresAt");
    }
  });

  it("Correctly retrieves a partial debit", async () => {
    const body = {
      authorization_code: "AUTH_72btv547",
      amount: (20_000).toString(),
      currency: "NGN",
      email: "johndoe@test.com",
    };

    const response = await paystack.transaction.partialDebit(body);

    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe(
        "merchant is not enabled for Partial Debit",
      );
    }
  });
});
