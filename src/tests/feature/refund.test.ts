import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { faker } from "@faker-js/faker";
import { expect } from "@std/expect/expect";

describe("Feature: Refund", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  let transactionRef: string;

  it("Correctly creates a refund", async () => {
    const transactionResponse = await paystack.transaction.initialize({
      email: faker.internet.email(),
      amount: 500_000,
    });

    transactionRef = transactionResponse?.data.reference as string;

    const response = await paystack.refund.create({
      transaction: transactionRef as string,
    });

    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe("Transaction was not successful");
    }
  });

  it("Correctly lists refunds", async () => {
    const response = await paystack.refund.list({
      perPage: 10,
      transaction: transactionRef,
      currency: "NGN",
      page: 1,
    });

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Refunds retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches a refund", async () => {
    const refundId = 54321;
    const response = await paystack.refund.fetch(refundId.toString());

    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe("Refund not found");
    }
  });
});
