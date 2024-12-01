import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { expect } from "@std/expect";
import { faker } from "@faker-js/faker";

describe("Feature Tests for Subscription", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  let subscriptionCode: string;

  it("Correctly creates a subscription", async () => {
    const customerResponse = await paystack.customer.create({
      email: "johndoe@test.com",
      first_name: "John",
      last_name: "Doe",
    });

    const customerCode = customerResponse?.data.customer_code as string;

    const planResponse = await paystack.plan.create({
      name: "Test Plan",
      amount: 100000,
      interval: "monthly",
      currency: "NGN",
    });

    const planCode = planResponse?.data.plan_code as string;

    const body = {
      customer: customerCode,
      plan: planCode,
    };

    const response = await paystack.subscription.create(body);

    if (response) {
      subscriptionCode = response.data.subscription_code;
      expect(response.status).toBe(true);
      expect(response.message).toBe("Subscription successfully created");
      expect(response.data).toHaveProperty("subscription_code");
    }
  });

  it("Correctly lists subscriptions", async () => {
    const queries = {
      perPage: 10,
      page: 1,
    };

    const response = await paystack.subscription.list(queries);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Subscriptions retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches a subscription", async () => {
    const response = await paystack.subscription.fetch(subscriptionCode);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Subscription retrieved successfully");
      expect(response.data).toHaveProperty(
        "subscription_code",
        subscriptionCode,
      );
    }
  });

  it("Correctly enables a subscription", async () => {
    const body = {
      code: subscriptionCode,
      token: faker.string.alphanumeric(10),
    };

    const response = await paystack.subscription.enable(body);

    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe("Subscription not found");
    }
  });

  it("Correctly disables a subscription", async () => {
    const body = {
      code: subscriptionCode,
      token: faker.string.alphanumeric(10),
    };

    const response = await paystack.subscription.disable(body);

    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe(
        "Subscription with code not found or already inactive",
      );
    }
  });

  it("Correctly generates an update subscription link", async () => {
    const response = await paystack.subscription.generateLink(subscriptionCode);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Link generated");
      expect(response.data).toHaveProperty("link");
    }
  });

  it("Correctly sends an update subscription link", async () => {
    const response = await paystack.subscription.sendLink(subscriptionCode);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Email successfully sent");
    }
  });
});
