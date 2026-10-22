import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
import { attachQueries } from "./handleQueries.js";

describe("Unit Tests for Transaction", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly initialize a transaction", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      amount: 500_000,
      email: "johndoe@test.com",
    };

    const expectedUrl = `${baseUrl}/transaction/initialize`;

    await paystack.transaction.initialize(body);

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

  it("Should correctly verify a transaction", async () => {
    const fetchStub = mockPaystackFetch();

    const reference = "OPLKJHGF";

    const expectedUrl = `${baseUrl}/transaction/verify/${reference}`;

    await paystack.transaction.verify(reference);

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

  it("Should correctly list transactions", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      perPage: 10,
      page: 1,
    };
    const expectedUrl = `${baseUrl}/transaction`;

    await paystack.transaction.list(queries);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        `${expectedUrl}?perPage=${queries.perPage}&page=${queries.page}`,
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

  it("Should correctly fetch a transaction", async () => {
    const fetchStub = mockPaystackFetch();

    const transactionId = "OPLKJHGF";
    const expectedUrl = `${baseUrl}/transaction/${transactionId}`;

    await paystack.transaction.fetch(transactionId);

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

  it("Should correctly charge an authorization", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      amount: (500_000).toString(),
      email: "johndoe@test.com",
      authorization_code: "AUTH_8dfhjjdt",
    };

    const expectedUrl = `${baseUrl}/transaction/charge_authorization`;

    await paystack.transaction.chargeAuthorization(body);

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

  it("Should correctly view transaction timeline", async () => {
    const fetchStub = mockPaystackFetch();

    const transactionRef = "OPLKJHGF";
    const expectedUrl = `${baseUrl}/transaction/timeline/${transactionRef}`;

    await paystack.transaction.timeline(transactionRef);

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

  it("Should correctly get transaction totals", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      perPage: 10,
      page: 1,
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/transaction/totals`);

    await paystack.transaction.totals(queries);

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

  it("Should correctly export transactions", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      perPage: 10,
      page: 1,
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/transaction/export`);

    await paystack.transaction.export(queries);

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

  it("Should correctly retrieve a partial debit", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      authorization_code: "AUTH_8dfhjjdt",
      amount: (500_000).toString(),
      currency: "NGN",
      email: "johndoe@test.com",
    };

    const expectedUrl = `${baseUrl}/transaction/partial_debit`;

    await paystack.transaction.partialDebit(body);

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
});
