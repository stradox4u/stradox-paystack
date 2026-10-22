import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
import { faker } from "@faker-js/faker";
import { attachQueries } from "./handleQueries.js";

describe("Unit Tests for Payment Page", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create the payment page", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      name: faker.word.words(2),
      description: faker.lorem.sentence(),
      amount:
        (faker.number.int({ min: 10_000, max: 5_000_000 }) as number) * 100,
    };

    const expectedUrl = `${baseUrl}/page`;

    await paystack.paymentPage.create(body);

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

  it("Should correctly list payment pages", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      perPage: 10,
      page: 1,
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/page`);

    await paystack.paymentPage.list(queries);

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

  it("Should correctly fetch a payment page", async () => {
    const fetchStub = mockPaystackFetch();

    const slug = faker.word.noun();
    const expectedUrl = `${baseUrl}/page/${slug}`;

    await paystack.paymentPage.fetch(slug);

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

  it("Should correctly update a payment page", async () => {
    const fetchStub = mockPaystackFetch();

    const slug = faker.word.noun();
    const body = {
      name: faker.word.words(2),
      description: faker.lorem.sentence(),
      amount:
        (faker.number.int({ min: 10_000, max: 5_000_000 }) as number) * 100,
    };

    const expectedUrl = `${baseUrl}/page/${slug}`;

    await paystack.paymentPage.update(slug, body);

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

  it("Should correctly check slug availability", async () => {
    const fetchStub = mockPaystackFetch();

    const slug = faker.word.noun();
    const expectedUrl = `${baseUrl}/page/check_slug_availability/${slug}`;

    await paystack.paymentPage.checkSlugAvailability(slug);

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

  it("Should correctly add products", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      products: [473, 492],
    };
    const pageId = crypto.randomUUID();

    const expectedUrl = `${baseUrl}/page/${pageId}/product`;

    await paystack.paymentPage.addProducts(pageId, body);

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
});
