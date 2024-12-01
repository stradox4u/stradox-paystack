import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import { assertSpyCallArgs, assertSpyCalls, returnsNext, stub } from "@std/testing/mock";
import { faker } from "@faker-js/faker";
import { attachQueries } from "./handleQueries.ts";

describe("Unit Tests for Dedicated Virtual Account", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a dedicated virtual account", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const body = {
      customer: "CUS_xnxdt6s1zg1f4nx",
    }

    const expectedUrl = `${baseUrl}/dedicated_account`;

    await paystack.virtualAccount.create(body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }])
  });

  it("Should correctly assign a dedicated virtual account", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const body = {
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      phone: faker.phone.number(),
      preferred_bank: "044",
      country: "NG" as const,
    };

    const expectedUrl = `${baseUrl}/dedicated_account/assign`;

    await paystack.virtualAccount.assign(body);

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

  it("Should correctly list dedicated virtual accounts", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const queries = {
      perPage: 10,
      page: 1,
      active: true,
      currency: "NGN",
    };
    const expectedUrl = attachQueries(queries, `${baseUrl}/dedicated_account`);

    await paystack.virtualAccount.list(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly fetch a dedicated virtual account", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const id = faker.string.alphanumeric(10);
    const expectedUrl = `${baseUrl}/dedicated_account/${id}`;

    await paystack.virtualAccount.fetch(id);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly requery a dedicated virtual account", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const queries = {
      account_number: faker.finance.accountNumber(),
      provider_slug: "wema-bank",
    };
    const expectedUrl = attachQueries(queries, `${baseUrl}/dedicated_account/requery`);

    await paystack.virtualAccount.requery(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly deactivate a dedicated virtual account", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const id = faker.string.alphanumeric(10);
    const expectedUrl = `${baseUrl}/dedicated_account/${id}`;

    await paystack.virtualAccount.deactivate(id);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
      body: JSON.stringify({}),
    }]);
  });

  it("Should correctly split a dedicated virtual account transaction", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const body = {
      customer: "CUS_xnxdt6s1zg1f4nx",
    };
    const expectedUrl = `${baseUrl}/dedicated_account/split`;

    await paystack.virtualAccount.split(body);

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

  it("Should correctly remove a split from a dedicated virtual account", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const body = {
      account_number: faker.finance.accountNumber(),
    };
    const expectedUrl = `${baseUrl}/dedicated_account/split`;

    await paystack.virtualAccount.removeSplit(body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }]);
  });

  it("Should correctly fetch bank providers", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Some message from server" })),
    }) as unknown as Promise<Response>]));

    const expectedUrl = `${baseUrl}/dedicated_account/available_providers`;

    await paystack.virtualAccount.fetchProviders();

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });
});