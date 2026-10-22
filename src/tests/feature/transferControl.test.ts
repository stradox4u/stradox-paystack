import { describe, expect, it } from "vitest";
import { Paystack } from "../../main.js";
describe("Feature Tests for Transfer Controls", () => {
  const paystack = new Paystack(process.env.SECRET_KEY as string);

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
