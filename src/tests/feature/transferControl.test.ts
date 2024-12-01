import { describe, it } from "jsr:@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { expect } from "jsr:@std/expect";

describe("Feature Tests for Transfer Controls", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);

  it("Correctly checks the balance", async () => {
    const response = await paystack.transferControl.checkBalance();

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Balances retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });

  it("Correctly fetches the balance ledger", async () => {
    const response = await paystack.transferControl.fetchLedger();

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Balance ledger retrieved");
      expect(response.data).toBeInstanceOf(Array);
    }
  });
});
