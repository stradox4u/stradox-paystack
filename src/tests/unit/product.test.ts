import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { assertSpyCallArgs, assertSpyCalls, returnsNext, stub } from "@std/testing/mock";

describe("Unit Tests for Product", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a product", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const body = {
      name: "Test Product",
      description: "This is a test product",
      price: 500_000,
      currency: "NGN",
    };

    const expectedUrl = `${baseUrl}/product`;

    await paystack.product.create(body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }]);
  });

  it("Should correctly list products", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const queries = {
      perPage: 10,
      page: 1,
    };

    const expectedUrl = `${baseUrl}/product`;

    await paystack.product.list(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [`${expectedUrl}?perPage=${queries.perPage}&page=${queries.page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly fetch a product", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const prodId = "PROD_1234567890";

    const expectedUrl = `${baseUrl}/product/${prodId}`;

    await paystack.product.fetch(prodId);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly update a product", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const prodId = "PROD_1234567890";
    const body = {
      name: "Test Product Edited",
      description: "This is an edited test product",
      price: 1_000_000,
      currency: "NGN",
    };

    const expectedUrl = `${baseUrl}/product/${prodId}`;

    await paystack.product.update(prodId, body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }]);
  });
});