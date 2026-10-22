import { describe, expect, it } from "vitest";
import { Paystack } from "../../main.js";
import { faker } from "@faker-js/faker";
describe("Feature Tests for Transaction Split", () => {
  const paystack = new Paystack(process.env.SECRET_KEY as string);

  it("Correctly creates a transaction split", async () => {
    const body = {
      name: faker.word.words(2),
      type: "percentage" as const,
      currency: "NGN",
      subaccounts: [
        {
          subaccount: `ACCT_${faker.string.alphanumeric(10)}`,
          share: 20,
        },
      ],
      bearer_type: "all-proportional" as const,
      bearer_subaccount: `ACCT_${faker.string.alphanumeric(10)}`,
    };

    const response = await paystack.split.create(body);

    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe(
        "Bearer subaccount must be part of split group",
      );
    }
  });

  it("Correctly lists transaction splits", async () => {
    const queries = {
      active: true,
      name: faker.word.words(2),
    };

    const response = await paystack.split.list(queries);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Split retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches a transaction split", async () => {
    const splitId = `SPL_${faker.string.alphanumeric(8)}`;

    const response = await paystack.split.fetch(splitId);

    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe("Split not found");
    }
  });
});
