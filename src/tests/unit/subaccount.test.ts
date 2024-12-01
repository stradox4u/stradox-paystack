import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { assertSpyCallArgs, assertSpyCalls, returnsNext, stub } from "@std/testing/mock";
import { attachQueries } from "./handleQueries.ts";

describe("Unit Tests for Subaccount", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a subaccount", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const body = {
      business_name: "Business Name",
      bank_code: "057",
      account_number: "0000000000",
      percentage_charge: 5,
    };

    const expectedUrl = `${baseUrl}/subaccount`;

    await paystack.subaccount.create(body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }]);
  });

  it("Should correctly list subaccounts", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const queries = {
      perPage: 10,
      page: 1,
      from: new Date("2021-01-01"),
      to: new Date("2021-12-31"),
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/subaccount`);

    await paystack.subaccount.list(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly fetch a subaccount", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const subacctId = "SUBACCOUNT_ID";
    const expectedUrl = `${baseUrl}/subaccount/${subacctId}`;

    await paystack.subaccount.fetch(subacctId);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly update a subaccount", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const subacctId = "SUBACCOUNT_ID";
    const body = {
      business_name: "Business Name",
      description: "Some updated description",
      bank_code: "057",
      account_number: "0000000000",
      percentage_charge: 5,
    };

    const expectedUrl = `${baseUrl}/subaccount/${subacctId}`;

    await paystack.subaccount.update(subacctId, body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }]);
  });
});