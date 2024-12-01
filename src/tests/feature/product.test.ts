import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { faker } from "@faker-js/faker";
import { expect } from "@std/expect";

describe("Feature Tests for Product", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  let productId: number;

  it("Correctly creates a product", async () => {
    const body = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: 500_000,
      currency: "NGN",
    };

    const response = await paystack.product.create(body);

    if (response) {
      productId = response.data.id;
      expect(response.status).toBe(true);
      expect(response.message).toBe("Product successfully created");
      expect(response.data).toHaveProperty("product_code");
      expect(response.data).toHaveProperty("name", body.name);
      expect(response.data).toHaveProperty("description", body.description);
      expect(response.data).toHaveProperty("price", body.price);
      expect(response.data).toHaveProperty("currency", body.currency);
    }
  });

  it("Correctly lists products", async () => {
    const queries = {
      perPage: 10,
      page: 1,
    };

    const response = await paystack.product.list(queries);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Products retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches a product", async () => {
    const response = await paystack.product.fetch(productId.toString());

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Product retrieved");
      expect(response.data).toHaveProperty("id", productId);
    }
  });

  it("Correctly updates a product", async () => {
    const body = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: 1_000_000,
      currency: "NGN",
    };

    const response = await paystack.product.update(productId.toString(), body);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Product successfully updated");
      expect(response.data).toHaveProperty("id", productId);
      expect(response.data).toHaveProperty("name", body.name);
      expect(response.data).toHaveProperty("description", body.description);
      expect(response.data).toHaveProperty("price", body.price);
      expect(response.data).toHaveProperty("currency", body.currency);
    }
  });
});