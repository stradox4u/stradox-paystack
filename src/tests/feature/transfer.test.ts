import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { expect } from "@std/expect";

describe("Feature Tests for Transfer", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  let transferCode: string;
  let transferRef: string;
  let recipientId: number;

  it("Correctly initiates a transfer", async () => {
    const recipientResponse = await paystack.recipient.create({
      type: "nuban",
      name: "John Doe",
      account_number: "0000000000",
      bank_code: "057",
    });

    const recipientCode = recipientResponse?.data.recipient_code as string;
    recipientId = recipientResponse?.data.id as number;

    const body = {
      source: "balance" as const,
      amount: 10000,
      recipient: recipientCode,
      reason: "Holiday Flexing",
    };

    const response = await paystack.transfer.initiate(body);

    if (response) {
      transferCode = response.data.transfer_code;
      transferRef = response.data.transfer_code;
      expect(response.status).toBe(true);
      expect(response.message).toBe("Transfer requires OTP to continue");
    }
  });

  it("Correctly intiates a bulk transfer", async () => {
    const firstRecipientResponse = await paystack.recipient.create({
      type: "nuban",
      name: "Jane Doe",
      account_number: "0000000000",
      bank_code: "057",
    });

    const secondRecipientResponse = await paystack.recipient.create({
      type: "nuban",
      name: "Jane Doe",
      account_number: "0000000000",
      bank_code: "057",
    });

    const firstRecipientCode = firstRecipientResponse?.data.recipient_code as string;
    const secondRecipientCode = secondRecipientResponse?.data.recipient_code as string;

    const body = {
      source: "balance" as const,
      transfers: [
      {
        recipient: firstRecipientCode,
        amount: 10000,
        reason: "Holiday Flexing",
      },
      {
        recipient: secondRecipientCode,
        amount: 10000,
        reason: "Holiday Flexing",
      },
      ]
    };

    const response = await paystack.transfer.initiateBulk(body);
    
    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe("You need to disable the OTP requirement to use this feature.");
    }
  });

  it("Correctly lists transfers", async () => {
    const queries = {
      perPage: 1,
      page: 1,
      recipient: recipientId,
    };

    const response = await paystack.transfer.list(queries);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Transfers retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches a transfer", async () => {
    const response = await paystack.transfer.fetch(transferCode);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Transfer retrieved");
      expect(response.data).toHaveProperty("transfer_code", transferCode);
    }
  });

  it("Correctly verifies a transfer", async () => {
    const response = await paystack.transfer.verify(transferRef);

    if (response) {
      console.log({ response });
      expect(response.status).toBe(false);
      expect(response.message).toBe("Transfer not found");
    }
  });
});