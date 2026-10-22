import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
import { faker } from "@faker-js/faker";
import { attachQueries } from "./handleQueries.js";

describe("Unit Tests for Plan", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a plan", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      name: faker.word.words(2),
      amount: 500_000,
      interval: "monthly" as const,
    };

    const expectedUrl = `${baseUrl}/plan`;

    await paystack.plan.create(body);

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

  it("Should correctly list plans", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      perPage: 10,
      page: 1,
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/plan`);

    await paystack.plan.list(queries);

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

  it("Should correctly fetch a plan", async () => {
    const fetchStub = mockPaystackFetch();

    const planId = faker.string.alphanumeric(10);

    const expectedUrl = `${baseUrl}/plan/${planId}`;

    await paystack.plan.fetch(planId);

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

  it("Should correctly update a plan", async () => {
    const fetchStub = mockPaystackFetch();

    const planId = faker.string.alphanumeric(10);
    const body = {
      name: faker.word.words(2),
      amount: 500_000,
      interval: "weekly" as const,
    };
    const expectedUrl = `${baseUrl}/plan/${planId}`;

    await paystack.plan.update(planId, body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "PUT",
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
