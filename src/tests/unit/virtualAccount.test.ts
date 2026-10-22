import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
import { faker } from "@faker-js/faker";
import { attachQueries } from "./handleQueries.js";

describe("Unit Tests for Dedicated Virtual Account", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a dedicated virtual account", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      customer: "CUS_xnxdt6s1zg1f4nx",
    };

    const expectedUrl = `${baseUrl}/dedicated_account`;

    await paystack.virtualAccount.create(body);

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

  it("Should correctly assign a dedicated virtual account", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      phone: faker.phone.number(),
      preferred_bank: "044",
      country: "NG" as const,
    };

    const expectedUrl = `${baseUrl}/dedicated_account/assign`;

    await paystack.virtualAccount.assign(body);

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

  it("Should correctly list dedicated virtual accounts", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      perPage: 10,
      page: 1,
      active: true,
      currency: "NGN",
    };
    const expectedUrl = attachQueries(queries, `${baseUrl}/dedicated_account`);

    await paystack.virtualAccount.list(queries);

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

  it("Should correctly fetch a dedicated virtual account", async () => {
    const fetchStub = mockPaystackFetch();

    const id = faker.string.alphanumeric(10);
    const expectedUrl = `${baseUrl}/dedicated_account/${id}`;

    await paystack.virtualAccount.fetch(id);

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

  it("Should correctly requery a dedicated virtual account", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      account_number: faker.finance.accountNumber(),
      provider_slug: "wema-bank",
    };
    const expectedUrl = attachQueries(
      queries,
      `${baseUrl}/dedicated_account/requery`,
    );

    await paystack.virtualAccount.requery(queries);

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

  it("Should correctly deactivate a dedicated virtual account", async () => {
    const fetchStub = mockPaystackFetch();

    const id = faker.string.alphanumeric(10);
    const expectedUrl = `${baseUrl}/dedicated_account/${id}`;

    await paystack.virtualAccount.deactivate(id);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
          body: JSON.stringify({}),
        },
      ],
    );
  });

  it("Should correctly split a dedicated virtual account transaction", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      customer: "CUS_xnxdt6s1zg1f4nx",
    };
    const expectedUrl = `${baseUrl}/dedicated_account/split`;

    await paystack.virtualAccount.split(body);

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

  it("Should correctly remove a split from a dedicated virtual account", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      account_number: faker.finance.accountNumber(),
    };
    const expectedUrl = `${baseUrl}/dedicated_account/split`;

    await paystack.virtualAccount.removeSplit(body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "DELETE",
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

  it("Should correctly fetch bank providers", async () => {
    const fetchStub = mockPaystackFetch();

    const expectedUrl = `${baseUrl}/dedicated_account/available_providers`;

    await paystack.virtualAccount.fetchProviders();

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
