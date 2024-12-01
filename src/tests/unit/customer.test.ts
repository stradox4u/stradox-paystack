import { describe, it } from "jsr:@std/testing/bdd";
import { Paystack } from "../../main.ts";
import {
  assertSpyCallArgs,
  assertSpyCalls,
  returnsNext,
  stub,
} from "jsr:@std/testing/mock";
import { attachQueries } from "./handleQueries.ts";

describe("Unit Tests for Customer", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a customer", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json: async () => (await Promise.resolve({
          status: false,
          message: "Some message from server",
        })),
      }) as unknown as Promise<Response>]),
    );

    const body = {
      email: "johndoe@test.com",
      first_name: "John",
      last_name: "Doe",
      phone: "08123456789",
      metadata: {
        custom_fields: [
          {
            value: "John Doe",
            display_name: "Customer Name",
            variable_name: "customer_name",
          },
        ],
      },
    };

    const expectedUrl = `${baseUrl}/customer`;

    await paystack.customer.create(body);

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

  it("Should correctly list customers", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json: async () => (await Promise.resolve({
          status: false,
          message: "Some message from server",
        })),
      }) as unknown as Promise<Response>]),
    );

    const queries = {
      perPage: 10,
      page: 1,
      from: new Date("2021-01-01"),
      to: new Date("2021-12-31"),
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/customer`);

    await paystack.customer.list(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly fetch a customer", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json: async () => (await Promise.resolve({
          status: false,
          message: "Some message from server",
        })),
      }) as unknown as Promise<Response>]),
    );

    const customerEmail = "johndoe@test.com";
    const expectedUrl = `${baseUrl}/customer/${customerEmail}`;

    await paystack.customer.fetch(customerEmail);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly update a customer", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json: async () => (await Promise.resolve({
          status: false,
          message: "Some message from server",
        })),
      }) as unknown as Promise<Response>]),
    );

    const customerCode = "CUS_1234567890";
    const body = {
      first_name: "John",
      last_name: "Doe",
      phone: "08123456789",
      metadata: {
        custom_fields: [
          {
            value: "John Doe",
            display_name: "Customer Name",
            variable_name: "customer_name",
          },
        ],
      },
    };
    const expectedUrl = `${baseUrl}/customer/${customerCode}`;

    await paystack.customer.update(customerCode, body);

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

  it("Should correctly validate a customer", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json: async () => (await Promise.resolve({
          status: false,
          message: "Some message from server",
        })),
      }) as unknown as Promise<Response>]),
    );

    const customerCode = "CUS_1234567890";
    const body = {
      first_name: "John",
      middle_name: "Mirthless",
      last_name: "Doe",
      type: "bank_account" as const,
      value: "1234567890",
      country: "NG",
      bvn: "1234567890",
      bank_code: "044",
      account_number: "1234567890",
    };
    const expectedUrl = `${baseUrl}/customer/${customerCode}/identification`;

    await paystack.customer.validate(customerCode, body);

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

  it("Should correctly whitelist a customer", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json: async () => (await Promise.resolve({
          status: false,
          message: "Some message from server",
        })),
      }) as unknown as Promise<Response>]),
    );

    const body = {
      customer: "CUS_1234567890",
      risk_action: "deny" as const,
    };
    const expectedUrl = `${baseUrl}/customer/set_risk_action`;

    await paystack.customer.whiteOrBlacklist(body);

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

  it("Should correctly deactivate an authorization", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json: async () => (await Promise.resolve({
          status: false,
          message: "Some message from server",
        })),
      }) as unknown as Promise<Response>]),
    );

    const body = {
      authorization_code: "AUTH_1234567890",
    };
    const expectedUrl = `${baseUrl}/customer/deactivate_authorization`;

    await paystack.customer.deactivateAuthorization(body);

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
});
