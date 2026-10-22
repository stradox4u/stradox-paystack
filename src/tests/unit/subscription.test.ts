import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
import { attachQueries } from "./handleQueries.js";
import { faker } from "@faker-js/faker";

describe("Unit Tests for Subscription", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a subscription", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      customer: "CUS_xnxdt6s1zg1f4nx",
      plan: "PLN_gx2wn530m0i3w3m",
      authorization: "AUTH_8dfhjjdt",
    };

    const expectedUrl = `${baseUrl}/subscription`;

    await paystack.subscription.create(body);

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

  it("Should correctly list subscriptions", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      perPage: 10,
      page: 1,
      from: new Date("2021-01-01"),
      to: new Date("2021-12-31"),
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/subscription`);

    await paystack.subscription.list(queries);

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

  it("Should correctly fetch a subscription", async () => {
    const fetchStub = mockPaystackFetch();

    const subscriptionId = "SUBSCRIPTION_ID";
    const expectedUrl = `${baseUrl}/subscription/${subscriptionId}`;

    await paystack.subscription.fetch(subscriptionId);

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

  it("Should correctly enable a subscription", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      code: "SUBSCRIPTION_CODE",
      token: faker.string.alphanumeric(10),
    };

    const expectedUrl = `${baseUrl}/subscription/enable`;

    await paystack.subscription.enable(body);

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

  it("Should correctly disable a subscription", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      code: "SUBSCRIPTION_CODE",
      token: faker.string.alphanumeric(10),
    };

    const expectedUrl = `${baseUrl}/subscription/disable`;

    await paystack.subscription.disable(body);

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

  it("Should correctly generate an update subscription link", async () => {
    const fetchStub = mockPaystackFetch();

    const subscriptionCode = "SUBSCRIPTION_CODE";

    const expectedUrl = `${baseUrl}/subscription/${subscriptionCode}/manage/link`;

    await paystack.subscription.generateLink(subscriptionCode);

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

  it("Should correctly send an update subscription link", async () => {
    const fetchStub = mockPaystackFetch();

    const subscriptionCode = "SUBSCRIPTION_CODE";

    const expectedUrl = `${baseUrl}/subscription/${subscriptionCode}/manage/email`;

    await paystack.subscription.sendLink(subscriptionCode);

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
