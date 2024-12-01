import { describe, it } from "jsr:@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { faker } from "npm:@faker-js/faker";
import { expect } from "jsr:@std/expect";

describe("Feature Tests for Payment Page", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  let pageId: number;

  it("Correctly creates a payment page", async () => {
    const body = {
      name: faker.word.words(2),
      description: faker.lorem.sentence(6),
      amount: 100_000,
    };

    const response = await paystack.paymentPage.create(body);

    if (response) {
      pageId = response.data.id;
      expect(response.status).toBe(true);
      expect(response.message).toBe("Page created");
      expect(response.data).toHaveProperty("amount", body.amount);
      expect(response.data).toHaveProperty("name", body.name);
      expect(response.data).toHaveProperty("description", body.description);
    }
  });

  it("Correctly lists payment pages", async () => {
    const queries = {
      perPage: 10,
      page: 1,
    };

    const response = await paystack.paymentPage.list(queries);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Pages retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches a payment page", async () => {
    const response = await paystack.paymentPage.fetch(pageId.toString());

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Page retrieved");
      expect(response.data).toHaveProperty("id", pageId);
    }
  });

  it("Correctly updates a payment page", async () => {
    const body = {
      name: faker.word.words(2),
      description: faker.lorem.sentence(6),
      amount: 200_000,
    };

    const response = await paystack.paymentPage.update(pageId.toString(), body);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Page updated");
      expect(response.data).toHaveProperty("amount", body.amount);
      expect(response.data).toHaveProperty("name", body.name);
      expect(response.data).toHaveProperty("description", body.description);
    }
  });

  it("Correctly checks slug availability", async () => {
    const slug = crypto.randomUUID();
    const response = await paystack.paymentPage.checkSlugAvailability(slug);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Slug is available");
    }
  });

  it("Correctly adds products to a page", async () => {
    const productResponse = await paystack.product.create({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: 100_000,
      currency: "NGN",
    });
    const productId = productResponse?.data.id as number;

    const body = {
      products: [productId],
    };

    const response = await paystack.paymentPage.addProducts(
      pageId.toString(),
      body,
    );

    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe("Page not found");
    }
  });
});
