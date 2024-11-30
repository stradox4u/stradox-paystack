import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { expect } from "@std/expect";

describe("Feature: Dispute", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);

  it("Correctly list disputes", async () => {
    const response = await paystack.dispute.list({
      perPage: 10,
      page: 1,
      from: new Date("2021-01-01"),
      to: new Date("2021-12-31"),
      status: "awaiting-bank-feedback",
      transaction: "TRF_1k2k3k4k5k6k7k8k9k0k",
    });

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Disputes retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches a dispute", async () => {
    const response = await paystack.dispute.fetch("DS_1k2k3k4k5k6k7k8k9k0k");

    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe("Invalid dispute ID");
    }
  });

  it("Correctly lists a transaction's disputes", async () => {
    const response = await paystack.dispute.listTransactionDisputes(
      "TRF_1k2k3k4k5k6k7k8k9k0k",
    );

    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe("An error occurred");
    }
  });

  it("Correctly exports disputes", async () => {
    const response = await paystack.dispute.export({
      from: new Date("2021-01-01"),
      to: new Date("2021-12-31"),
    });

    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe("No disputes found");
    }
  });
});
