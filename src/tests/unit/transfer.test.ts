import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
import { attachQueries } from "./handleQueries.js";

describe("Unit Tests for Transfer", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly initiate a transfer", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      source: "balance" as const,
      amount: 10000,
      recipient: "RCP_1x2x3x4x5x6x7x8x9x0",
      reason: "Holiday Flexing",
    };

    const expectedUrl = `${baseUrl}/transfer`;

    await paystack.transfer.initiate(body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        },
      ],
    );
  });

  it("Should correctly finalize a transfer", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      transfer_code: "TRF_1x2x3x4x5x6x7x8x9x0",
      otp: "123456",
    };

    const expectedUrl = `${baseUrl}/transfer/finalize_transfer`;

    await paystack.transfer.finalize(body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        },
      ],
    );
  });

  it("Should correctly initiate a bulk transfer", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      source: "balance" as const,
      transfers: [
        {
          recipient: "RCP_1x2x3x4x5x6x7x8x9x0",
          amount: 10000,
          reason: "Holiday Flexing",
        },
        {
          recipient: "RCP_1x2x3x4x5x6x7x8x9x1",
          amount: 20000,
          reason: "Holiday Flexing",
        },
      ],
    };

    const expectedUrl = `${baseUrl}/transfer/bulk`;

    await paystack.transfer.initiateBulk(body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        },
      ],
    );
  });

  it("Should correctly list transfers", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      perPage: 10,
      page: 1,
      recipient: 654321,
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/transfer`);

    await paystack.transfer.list(queries);

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

  it("Should correctly fetch a transfer", async () => {
    const fetchStub = mockPaystackFetch();

    const transferCode = "TRF_1x2x3x4x5x6x7x8x9x0";

    const expectedUrl = `${baseUrl}/transfer/${transferCode}`;

    await paystack.transfer.fetch(transferCode);

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

  it("Should correctly verify a transfer", async () => {
    const fetchStub = mockPaystackFetch();

    const transferCode = "TRF_1x2x3x4x5x6x7x8x9x0";

    const expectedUrl = `${baseUrl}/transfer/verify/${transferCode}`;

    await paystack.transfer.verify(transferCode);

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
