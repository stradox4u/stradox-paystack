import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
describe("Unit Tests for Product", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a product", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      name: "Test Product",
      description: "This is a test product",
      price: 500_000,
      currency: "NGN",
    };

    const expectedUrl = `${baseUrl}/product`;

    await paystack.product.create(body);

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

  it("Should correctly list products", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      perPage: 10,
      page: 1,
    };

    const expectedUrl = `${baseUrl}/product`;

    await paystack.product.list(queries);

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

  it("Should correctly fetch a product", async () => {
    const fetchStub = mockPaystackFetch();

    const prodId = "PROD_1234567890";

    const expectedUrl = `${baseUrl}/product/${prodId}`;

    await paystack.product.fetch(prodId);

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

  it("Should correctly update a product", async () => {
    const fetchStub = mockPaystackFetch();

    const prodId = "PROD_1234567890";
    const body = {
      name: "Test Product Edited",
      description: "This is an edited test product",
      price: 1_000_000,
      currency: "NGN",
    };

    const expectedUrl = `${baseUrl}/product/${prodId}`;

    await paystack.product.update(prodId, body);

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
