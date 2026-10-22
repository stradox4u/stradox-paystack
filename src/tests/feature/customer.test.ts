import { describe, expect, it } from "vitest";
import { Paystack } from "../../main.js";
import { faker } from "@faker-js/faker";
import { getCustomerValidationFixture } from "../integration-env.js";

const validationFixture = getCustomerValidationFixture(process.env);

describe("Feature Tests for Customer", () => {
  const paystack = new Paystack(process.env.SECRET_KEY as string);
  let customerCode: string;

  it("Correctly creates a customer", async () => {
    const email = faker.internet.email();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const response = await paystack.customer.create({
      email,
      first_name: firstName,
      last_name: lastName,
      phone: "08123456789",
    });

    if (response) {
      customerCode = response.data.customer_code;
      expect(response.status).toBe(true);
      expect(response.message).toBe("Customer created");
      expect(response.data).toHaveProperty("email", email.toLowerCase());
      expect(response.data).toHaveProperty("customer_code");
    }
  });

  it("Correctly lists customers", async () => {
    const response = await paystack.customer.list({
      perPage: 10,
      page: 1,
    });

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Customers retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches a customer", async () => {
    const response = await paystack.customer.fetch(customerCode);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Customer retrieved");
      expect(response.data.customer_code).toBe(customerCode);
    }
  });

  it("Correctly updates a customer", async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const response = await paystack.customer.update(customerCode, {
      first_name: firstName,
      last_name: lastName,
      metadata: {
        custom_fields: [
          {
            value: firstName + " " + lastName,
            display_name: "Customer Name",
            variable_name: "customer_name",
          },
        ],
      },
    });

    if (response) {
      customerCode = response.data.customer_code;
      expect(response.status).toBe(true);
      expect(response.message).toBe("Customer updated");
      expect(response.data).toHaveProperty("first_name", firstName);
      expect(response.data).toHaveProperty("last_name", lastName);
      expect(response.data).toHaveProperty("metadata");
      expect(response.data.metadata).toHaveProperty("custom_fields");
    }
  });

  it.skipIf(!validationFixture)("Correctly validates a customer", async () => {
    // Reuse a dedicated customer: associating one BVN with a new customer on
    // every run eventually exceeds Paystack's per-integration limit.
    const fixture = validationFixture!;
    const response = await paystack.customer.validate(
      fixture.customerCode,
      fixture.body,
    );

    expect(response?.status, response?.message).toBe(true);
    expect(response?.message).toBe("Customer Identification in progress");
  });

  it("Correctly deactivates an authorization", async () => {
    const response = await paystack.customer.deactivateAuthorization({
      authorization_code: "AUTH_ncx8hews93",
    });

    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe("Authorization code not found.");
    }
  });
});
