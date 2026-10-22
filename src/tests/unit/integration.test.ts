import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
describe("Unit Tests for Integration", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should properly fetch the timeout", async () => {
    const fetchStub = mockPaystackFetch();

    const expectedUrl = `${baseUrl}/integration/payment_session_timeout`;

    await paystack.integration.fetchTimeout();

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should properly update the timeout", async () => {
    const fetchStub = mockPaystackFetch();

    const timeout = 500;
    const expectedUrl = `${baseUrl}/integration/payment_session_timeout`;

    await paystack.integration.updateTimeout({
      timeout,
    });

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ timeout }),
        },
      ],
    );
  });
});
