import { describe, expect, it } from "vitest";
import { Paystack } from "../../main.js";
describe("Feature Tests for Integration", () => {
  const paystack = new Paystack(process.env.SECRET_KEY as string);

  it("Correctly fetches the payment session timeout", async () => {
    const response = await paystack.integration.fetchTimeout();

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Payment session timeout retrieved");
      expect(response.data).toHaveProperty("payment_session_timeout");
    }
  });

  it("Correctly updates the payment session timeout", async () => {
    const response = await paystack.integration.updateTimeout({
      timeout: 500,
    });

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Payment session timeout updated");
      expect(response.data).toHaveProperty("payment_session_timeout");
    }
  });
});
