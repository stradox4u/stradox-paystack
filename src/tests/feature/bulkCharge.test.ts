import { describe, it } from "jsr:@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { expect } from "jsr:@std/expect";

describe("Feature Tests for Bulk Charge", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  let batchCode: string;

  it("Correctly initiates a bulk charge", async () => {
    const response = await paystack.bulkCharge.initiate([
      {
        authorization: "AUTH_ncx8hews93",
        amount: 2500,
        reference: "dam1266638dhhd",
      },
      {
        authorization: "AUTH_xfuz7dy4b9",
        amount: 1500,
        reference: "dam1266638dhhe",
      },
    ]);

    if (response) {
      batchCode = response.data.batch_code;
      expect(response.status).toBe(true);
      expect(response.message).toBe("Charges have been queued");
      expect(response.data.batch_code).toBeDefined();
      expect(response.data.total_charges).toBe(2);
      expect(response.data.reference).toBeDefined();
    }
  });

  it("Correctly lists bulk charge batches", async () => {
    const response = await paystack.bulkCharge.listBatches({
      perPage: 10,
      page: 1,
    });

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toEqual("Bulk charges retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches a bulk charge batch", async () => {
    const response = await paystack.bulkCharge.fetchBatch(batchCode);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toEqual("Bulk charge retrieved");
      expect(response.data.batch_code).toBe(batchCode);
    }
  });

  it("Correctly fetches charges in a batch", async () => {
    const response = await paystack.bulkCharge.fetchCharges(batchCode, {
      perPage: 10,
      page: 1,
      status: "pending" as const,
    });

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toEqual("Bulk charge items retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly pauses a bulk charge batch", async () => {
    const response = await paystack.bulkCharge.pauseBatch(batchCode);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toEqual("Bulk charge batch has been paused");
    }
  });

  it("Correctly resumes a bulk charge batch", async () => {
    const response = await paystack.bulkCharge.resumeBatch(batchCode);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toEqual("Bulk charge batch has been resumed");
    }
  });
});
