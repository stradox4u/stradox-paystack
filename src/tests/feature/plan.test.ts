import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { faker } from "@faker-js/faker";
import { expect } from "@std/expect/expect";

describe("Feature: Plan", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  let planCode: string;

  it("Correctly creates a plan", async () => {
    const body = {
      name: faker.word.words(2),
      amount: 500_000,
      interval: "monthly" as const,
    };

    const response = await paystack.plan.create(body);

    if (response) {
      planCode = response.data.plan_code;
      expect(response.status).toBe(true);
      expect(response.message).toBe("Plan created");
      expect(response.data).toHaveProperty("plan_code");
      expect(response.data).toHaveProperty("name", body.name);
      expect(response.data).toHaveProperty("amount", body.amount);
      expect(response.data).toHaveProperty("interval", body.interval);
    }
  });

  it("Correctly lists plans", async () => {
    const queries = {
      perPage: 10,
      page: 1,
    };

    const response = await paystack.plan.list(queries);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Plans retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches a plan", async () => {
    const response = await paystack.plan.fetch(planCode);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Plan retrieved");
      expect(response.data).toHaveProperty("plan_code", planCode);
    }
  });

  it("Correctly updates a plan", async () => {
    const body = {
      name: faker.word.words(2),
      amount: 1_000_000,
      interval: "annually" as const,
    };

    const response = await paystack.plan.update(planCode, body);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Plan updated. 0 subscription(s) affected");
    }
  });
});
