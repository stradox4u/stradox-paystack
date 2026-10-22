import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
import { attachQueries } from "./handleQueries.js";

describe("Unit Tests for Bulk Charge", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly initiate a bulk charge", async () => {
    const fetchStub = mockPaystackFetch();

    const bulkChargeData = [
      { amount: 1_000_000, authorization: "auth_code_01", reference: "ref_01" },
      { amount: 2_000_000, authorization: "auth_code_02", reference: "ref_02" },
      { amount: 2_500_000, authorization: "auth_code_03", reference: "ref_03" },
    ];

    await paystack.bulkCharge.initiate(bulkChargeData);

    const expectedUrl = `${baseUrl}/bulkcharge`;

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          body: JSON.stringify(bulkChargeData),
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly list batches", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      perPage: 10,
      page: 1,
      from: new Date("2021-01-01"),
    };

    await paystack.bulkCharge.listBatches(queries);

    const expectedUrl = attachQueries(queries, `${baseUrl}/bulkcharge`);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly fetch bulk charge batch", async () => {
    const fetchStub = mockPaystackFetch();

    const batchId = "batch_01";
    const expectedUrl = `${baseUrl}/bulkcharge/${batchId}`;

    await paystack.bulkCharge.fetchBatch(batchId);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly fetch charges in a batch", async () => {
    const fetchStub = mockPaystackFetch();

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

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly pause a batch", async () => {
    const fetchStub = mockPaystackFetch();

    const batchCode = "batch_01";
    const expectedUrl = `${baseUrl}/bulkcharge/pause/${batchCode}`;

    await paystack.bulkCharge.pauseBatch(batchCode);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly resume a batch", async () => {
    const fetchStub = mockPaystackFetch();

    const batchCode = "batch_01";
    const expectedUrl = `${baseUrl}/bulkcharge/resume/${batchCode}`;

    await paystack.bulkCharge.resumeBatch(batchCode);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
        },
      ],
    );
  });
});
