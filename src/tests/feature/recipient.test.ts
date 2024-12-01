import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { expect } from "@std/expect";
import { faker } from "@faker-js/faker";
import type { BulkCreateRecipientSuccess } from "../../types/recipient.ts";

describe("Feature: Transfer Recipient", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  let recipientCode: string;

  it("Correctly creates a transfer recipient", async () => {
    const body = {
      type: "nuban" as const,
      name: "Oluwole Adebiyi",
      account_number: "0000000000",
      bank_code: "057",
    };

    const response = await paystack.recipient.create(body);

    if (response) {
      recipientCode = response.data.recipient_code;
      expect(response.status).toBe(true);
      expect(response.message).toBe("Transfer recipient created successfully");
      expect(response.data).toHaveProperty("recipient_code");
    }
  });

  it("Correctly creates transfer recipients in bulk", async () => {
    const body = {
      batch: [
        {
          type: "nuban" as const,
          name: faker.person.fullName(),
          account_number: "0000000000",
          bank_code: "057",
        },
        {
          type: "nuban" as const,
          name: faker.person.fullName(),
          account_number: "0000000000",
          bank_code: "057",
        },
      ],
    };

    const response = await paystack.recipient.bulkCreate(body);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Recipients added successfully");
      expect(response.data).toHaveProperty("success");
      expect(response.data.success).toBeInstanceOf(Array);
      expect(response.data).toHaveProperty("errors");
      expect(response.data.errors).toBeInstanceOf(Array);

      const createdRecipients = response.data.success.map(
        (recipient: BulkCreateRecipientSuccess) => {
          return recipient.recipient_code;
        },
      );

      for await (const recipient of createdRecipients) {
        await paystack.recipient.delete(recipient);
      }
    }
  });

  it("Correctly lists transfer recipients", async () => {
    const response = await paystack.recipient.list({
      perPage: 10,
      page: 1,
    });

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Recipients retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches a transfer recipient", async () => {
    const response = await paystack.recipient.fetch(recipientCode);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Recipient retrieved");
      expect(response.data).toHaveProperty("recipient_code", recipientCode);
    }
  });

  it("Correctly updates a transfer recipient", async () => {
    const body = {
      name: faker.person.fullName(),
    };

    const response = await paystack.recipient.update(recipientCode, body);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Recipient updated");
    }
  });

  it("Correctly deletes a transfer recipient", async () => {
    const response = await paystack.recipient.delete(recipientCode);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Transfer recipient set as inactive");
    }
  });
});
