import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { faker } from "@faker-js/faker";
import { expect } from "@std/expect";

describe("Feature Tests for Subaccount", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  let subacctCode: string;

  it("Correctly creates a subaccount", async () => {
    const body = {
      business_name: "Subaccount Business Name",
      bank_code: "057",
      account_number: "0000000000",
      percentage_charge: 5,
    }

    const response = await paystack.subaccount.create(body);

    if (response) {
      subacctCode = response.data.subaccount_code;
      expect(response.status).toBe(true);
      expect(response.message).toBe("Subaccount created");
      expect(response.data).toHaveProperty("subaccount_code");
      expect(response.data).toHaveProperty("business_name", body.business_name);
      expect(response.data).toHaveProperty("account_number", body.account_number);
    }
  });

  it("Correctly lists subaccounts", async () => {
    const queries = {
      perPage: 10,
      page: 1,
      from: faker.date.recent(),
      to: new Date(),
    }
    const response = await paystack.subaccount.list(queries);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Subaccounts retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches a subaccount", async () => {
    const response = await paystack.subaccount.fetch(subacctCode);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Subaccount retrieved");
      expect(response.data).toHaveProperty("subaccount_code", subacctCode);
    }
  });

  it("Correctly updates a subaccount", async () => {
    const body = {
      business_name: faker.company.name(),
      description: faker.lorem.sentence()
    };

    const response = await paystack.subaccount.update(subacctCode, body);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Subaccount updated");
      expect(response.data).toHaveProperty("subaccount_code", subacctCode);
      expect(response.data).toHaveProperty("business_name", body.business_name);
      expect(response.data).toHaveProperty("description", body.description);
    }

    await paystack.subaccount.update(subacctCode, {
      business_name: "Subaccount Business Name",
      description: "Default description",
    });
  });
});