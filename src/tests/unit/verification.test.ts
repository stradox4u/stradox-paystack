import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { attachQueries } from "./handleQueries.ts";
import { assertSpyCallArgs, assertSpyCalls, returnsNext, stub } from "@std/testing/mock";
import { faker } from "@faker-js/faker";

describe("Unit Tests for Verification", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly resolve account", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const queries = {
      account_number: "0022728151",
      bank_code: "063",
    };
    const expectedUrl = attachQueries(queries, `${baseUrl}/bank/resolve`);

    await paystack.verification.resolveAccount(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly validate account", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const body = {
      account_name: faker.person.fullName(),
      account_number: faker.string.numeric(10),
      account_type: "personal" as const,
      bank_code: "063",
      country_code: "NG",
      document_type: "identityNumber" as const,
      document_number: faker.string.numeric(10),
    };
    const expectedUrl = `${baseUrl}/bank/validate`;

    await paystack.verification.validateAccount(body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }]);
  });

  it("Should correctly resolve card bin", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const bin = "539920";

    await paystack.verification.resolveBin(bin);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [`${baseUrl}/decision/bin/${bin}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });
});