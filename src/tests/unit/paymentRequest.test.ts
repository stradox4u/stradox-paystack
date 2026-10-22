import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
import { attachQueries } from "./handleQueries.js";

describe("Unit Tests for Payment Request", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a payment request", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      customer: "CUS_1t0k2s2j",
      amount: 100_000,
      line_items: [
        {
          name: "Item 1",
          quantity: 1,
          amount: 50_000,
        },
        {
          name: "Item 2",
          quantity: 1,
          amount: 50_000,
        },
      ],
    };

    const expectedUrl = `${baseUrl}/paymentrequest`;

    await paystack.paymentRequest.create(body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      ],
    );
  });

  it("Should correctly list payment requests", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      perPage: 10,
      page: 1,
      customer: "CUS_1t0k2s2j",
      status: "pending",
      currency: "NGN",
      include_archive: true,
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/paymentrequest`);

    await paystack.paymentRequest.list(queries);

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

  it("Should correctly fetch a payment request", async () => {
    const fetchStub = mockPaystackFetch();

    const id = "PRQ_1t0k2s2j";
    const expectedUrl = `${baseUrl}/paymentrequest/${id}`;

    await paystack.paymentRequest.fetch(id);

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

  it("Should correctly verify a payment request", async () => {
    const fetchStub = mockPaystackFetch();

    const code = "PRQ_1t0k2s2j";
    const expectedUrl = `${baseUrl}/paymentrequest/verify/${code}`;

    await paystack.paymentRequest.verify(code);

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

  it("Should correctly send a notification", async () => {
    const fetchStub = mockPaystackFetch();

    const code = "PRQ_1t0k2s2j";
    const expectedUrl = `${baseUrl}/paymentrequest/notify/${code}`;

    await paystack.paymentRequest.sendNotification(code);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
          body: JSON.stringify({}),
        },
      ],
    );
  });

  it("Should correctly get payment request totals", async () => {
    const fetchStub = mockPaystackFetch();

    const expectedUrl = `${baseUrl}/paymentrequest/totals`;

    await paystack.paymentRequest.requestTotal();

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

  it("Should correctly finalize a payment request", async () => {
    const fetchStub = mockPaystackFetch();

    const code = "PRQ_1t0k2s2j";
    const body = {
      send_notification: true,
    };

    const expectedUrl = `${baseUrl}/paymentrequest/finalize/${code}`;

    await paystack.paymentRequest.finalize(code, body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      ],
    );
  });

  it("Should correctly update a payment request", async () => {
    const fetchStub = mockPaystackFetch();

    const code = "PRQ_1t0k2s2j";
    const body = {
      amount: 250_000,
      customer: "CUS_1t0k2s2j",
    };

    const expectedUrl = `${baseUrl}/paymentrequest/${code}`;

    await paystack.paymentRequest.update(code, body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      ],
    );
  });

  it("Should correctly archive a payment request", async () => {
    const fetchStub = mockPaystackFetch();

    const code = "PRQ_1t0k2s2j";

    const expectedUrl = `${baseUrl}/paymentrequest/archive/${code}`;

    await paystack.paymentRequest.archive(code);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
          body: JSON.stringify({}),
        },
      ],
    );
  });
});
