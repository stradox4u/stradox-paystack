import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { assertSpyCallArgs, assertSpyCalls, returnsNext, stub } from "@std/testing/mock";

describe("Unit: Integration", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  it("Should properly fetch the timeout", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const expectedUrl = `${baseUrl}/integration/payment_session_timeout`;

    await paystack.integration.fetchTimeout();

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should properly update the timeout", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const timeout = 500;
    const expectedUrl = `${baseUrl}/integration/payment_session_timeout`;

    await paystack.integration.updateTimeout({
      timeout,
    });

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timeout }),
    }]);
  });
});