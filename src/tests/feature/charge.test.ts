import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { expect } from "@std/expect";

describe("Feature Tests for Charge", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  let reference: string;

  it("Correctly creates a charge", async () => {
    const response = await paystack.charge.create({
      email: "johndoe@test.com",
      amount: 2_500_000,
      bank: {
        code: "057",
        account_number: "0000000000",
      },
    });

    if (response) {
      reference = response.data.reference;
      expect(response.status).toBe(true);
      expect(response.message).toBe("Charge attempted");
      expect(response.data.reference).toBeDefined();
      expect(response.data.status).toBe("send_birthday");
    }
  });

  it("Correctly submits a PIN", async () => {
    const response = await paystack.charge.submitPin({
      reference,
      pin: "1234",
    });

    if (response) {
      expect(response.status).toBe(false);
      expect(response.data.status).toBe("failed");
    }
  });

  it("Correctly submits a birthday", async () => {
    const response = await paystack.charge.submitBirthday({
      reference,
      birthday: "1990-01-01",
    });

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Charge attempted");
      expect(response.data.status).toBe("send_otp");
    }
  });

  it("Correctly submits an OTP", async () => {
    const response = await paystack.charge.submitOtp({
      reference,
      otp: "123456",
    });

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Charge attempted");
    }
  });

  it("Correctly checks a pending charge", async () => {
    const response = await paystack.charge.checkPending(reference);

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Reference check successful");
      expect(response.data).toHaveProperty("status", "failed");
      expect(response.data).toHaveProperty("reference", reference);
      expect(response.data).toHaveProperty("message");
    }
  });
});
