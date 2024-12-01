import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { faker } from "@faker-js/faker";
import { expect } from "@std/expect";

describe("Feature: Payment Request", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  let paymentRequestCode: string;
  let customerId: number;

  it("Correctly creates a payment request", async () => {
    const customerResponse = await paystack.customer.create({
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
    });

    customerId = customerResponse?.data.id as number;

    const response = await paystack.paymentRequest.create({
      customer: customerId,
      amount: 100_000,
      line_items: [
        {
          name: "Item 1",
          quantity: 1,
          amount: 50_000,
        },
        {
          name: "Item 2",
          quantity: 1,
          amount: 50_000,
        },
      ],
    });

    if (response) {
      paymentRequestCode = response.data.request_code;
      expect(response.status).toBe(true);
      expect(response.message).toBe("Payment request created");
      expect(response.data).toHaveProperty("request_code");
    }
  });

  it("Correctly lists payment requests", async () => {
    const response = await paystack.paymentRequest.list({
      perPage: 10,
      page: 1,
      customer: customerId.toString(),
      status: "pending",
      currency: "NGN",
      include_archive: false,
    });

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Payment requests retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches a payment request", async () => {
    const response = await paystack.paymentRequest.fetch(paymentRequestCode);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Payment request retrieved");
      expect(response.data.request_code).toBe(paymentRequestCode);
    }
  });

  it("Correctly verifies a payment request", async () => {
    const response = await paystack.paymentRequest.verify(paymentRequestCode);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Payment request retrieved");
      expect(response.data.request_code).toBe(paymentRequestCode);
      expect(response.data).toHaveProperty("customer");
    }
  });

  it("Correctly sends a notification", async () => {
    const response = await paystack.paymentRequest.sendNotification(
      paymentRequestCode,
    );

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Notification sent");
    }
  });

  it("Correctly gets the payment request total", async () => {
    const response = await paystack.paymentRequest.requestTotal();

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Payment request totals");
      expect(response.data).toHaveProperty("pending");
      expect(response.data).toHaveProperty("successful");
      expect(response.data).toHaveProperty("total");
    }
  });

  it("Correctly finalizes a payment request", async () => {
    const paymentRequestResponse = await paystack.paymentRequest.create({
      customer: customerId,
      amount: 200_000,
      line_items: [
        {
          name: "Item 1",
          quantity: 2,
          amount: 100_000,
        },
        {
          name: "Item 2",
          quantity: 2,
          amount: 100_000,
        },
      ],
      draft: true,
    });

    paymentRequestCode = paymentRequestResponse?.data.request_code as string;

    const response = await paystack.paymentRequest.finalize(
      paymentRequestCode,
      {
        send_notification: true,
      },
    );

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Payment request finalized");
      expect(response.data).toHaveProperty("request_code", paymentRequestCode);
    }
  });

  it("Correctly updates a payment request", async () => {
    const paymentRequestResponse = await paystack.paymentRequest.create({
      customer: customerId,
      amount: 200_000,
      line_items: [
        {
          name: "Item 1",
          quantity: 2,
          amount: 100_000,
        },
        {
          name: "Item 2",
          quantity: 2,
          amount: 100_000,
        },
      ],
      draft: true,
    });

    paymentRequestCode = paymentRequestResponse?.data.request_code as string;

    const body = {
      customer: customerId.toString(),
      amount: 200_000,
      line_items: [
        {
          name: "Item 1",
          quantity: 2,
          amount: 100_000,
        },
        {
          name: "Item 2",
          quantity: 2,
          amount: 100_000,
        },
      ],
    };

    const response = await paystack.paymentRequest.update(
      paymentRequestCode,
      body,
    );

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Payment request updated");
      expect(response.data).toHaveProperty("request_code", paymentRequestCode);
    }
  });

  it("Correctly archives a payment request", async () => {
    const response = await paystack.paymentRequest.archive(paymentRequestCode);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Payment request has been archived");
    }
  });
});
