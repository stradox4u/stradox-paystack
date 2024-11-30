import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import {
  assertSpyCallArgs,
  assertSpyCalls,
  returnsNext,
  stub,
} from "@std/testing/mock";
import { attachQueries } from "./handleQueries.ts";

describe("Unit: Bulk Charge", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly initiate a bulk charge", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json: async () => (await Promise.resolve({
          status: false,
          message:
            "Some message from server",
        })),
      }) as unknown as Promise<Response>]),
    );

    const bulkChargeData = [
      { amount: 1_000_000, authorization: "auth_code_01", reference: "ref_01" },
      { amount: 2_000_000, authorization: "auth_code_02", reference: "ref_02" },
      { amount: 2_500_000, authorization: "auth_code_03", reference: "ref_03" },
    ];

    await paystack.bulkCharge.initiate(bulkChargeData);

    const expectedUrl = `${baseUrl}/bulkcharge`;

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "POST",
      body: JSON.stringify(bulkChargeData),
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly list batches", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json: async () => (await Promise.resolve({
          status: false,
          message:
            "Some message from server",
        })),
      }) as unknown as Promise<Response>]),
    );

    const queries = {
      perPage: 10,
      page: 1,
      from: new Date("2021-01-01"),
    };

    await paystack.bulkCharge.listBatches(queries);

    const expectedUrl = attachQueries(queries, `${baseUrl}/bulkcharge`);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly fetch bulk charge batch", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json: async () => (await Promise.resolve({
          status: false,
          message:
            "Some message from server",
        })),
      }) as unknown as Promise<Response>]),
    );

    const batchId = "batch_01";
    const expectedUrl = `${baseUrl}/bulkcharge/${batchId}`;

    await paystack.bulkCharge.fetchBatch(batchId);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly fetch charges in a batch", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json: async () => (await Promise.resolve({
          status: false,
          message:
            "Some message from server",
        })),
      }) as unknown as Promise<Response>]),
    );

    const batchId = "batch_01";
    const queries = {
      status: "success" as const,
      perPage: 10,
      page: 2,
      from: new Date("2021-01-01"),
      to: new Date("2021-12-31"),
    };
    const expectedUrl = attachQueries(
      queries,
      `${baseUrl}/bulkcharge/${batchId}/charges`,
    );

    await paystack.bulkCharge.fetchCharges(batchId, queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly pause a batch", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json: async () => (await Promise.resolve({
          status: false,
          message:
            "Some message from server",
        })),
      }) as unknown as Promise<Response>]),
    );

    const batchCode = "batch_01";
    const expectedUrl = `${baseUrl}/bulkcharge/pause/${batchCode}`;

    await paystack.bulkCharge.pauseBatch(batchCode);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly resume a batch", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json: async () => (await Promise.resolve({
          status: false,
          message:
            "Some message from server",
        })),
      }) as unknown as Promise<Response>]),
    );

    const batchCode = "batch_01";
    const expectedUrl = `${baseUrl}/bulkcharge/resume/${batchCode}`;

    await paystack.bulkCharge.resumeBatch(batchCode);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });
});
