import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import {
  assertSpyCallArgs,
  assertSpyCalls,
  returnsNext,
  stub,
} from "@std/testing/mock";
import { attachQueries } from "./handleQueries.ts";
import { faker } from "@faker-js/faker";

describe("Unit Tests for Subscription", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a subscription", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json:
          async () => (await Promise.resolve({
            status: false,
            message: "Some message from server",
          })),
      }) as unknown as Promise<Response>]),
    );

    const body = {
      customer: "CUS_xnxdt6s1zg1f4nx",
      plan: "PLN_gx2wn530m0i3w3m",
      authorization: "AUTH_8dfhjjdt",
    };

    const expectedUrl = `${baseUrl}/subscription`;

    await paystack.subscription.create(body);

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

  it("Should correctly list subscriptions", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json:
          async () => (await Promise.resolve({
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

    const expectedUrl = attachQueries(queries, `${baseUrl}/subscription`);

    await paystack.subscription.list(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly fetch a subscription", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json:
          async () => (await Promise.resolve({
            status: false,
            message: "Some message from server",
          })),
      }) as unknown as Promise<Response>]),
    );

    const subscriptionId = "SUBSCRIPTION_ID";
    const expectedUrl = `${baseUrl}/subscription/${subscriptionId}`;

    await paystack.subscription.fetch(subscriptionId);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly enable a subscription", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json:
          async () => (await Promise.resolve({
            status: false,
            message: "Some message from server",
          })),
      }) as unknown as Promise<Response>]),
    );

    const body = {
      code: "SUBSCRIPTION_CODE",
      token: faker.string.alphanumeric(10),
    };

    const expectedUrl = `${baseUrl}/subscription/enable`;

    await paystack.subscription.enable(body);

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

  it("Should correctly disable a subscription", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json:
          async () => (await Promise.resolve({
            status: false,
            message: "Some message from server",
          })),
      }) as unknown as Promise<Response>]),
    );

    const body = {
      code: "SUBSCRIPTION_CODE",
      token: faker.string.alphanumeric(10),
    };

    const expectedUrl = `${baseUrl}/subscription/disable`;

    await paystack.subscription.disable(body);

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

  it("Should correctly generate an update subscription link", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json:
          async () => (await Promise.resolve({
            status: false,
            message: "Some message from server",
          })),
      }) as unknown as Promise<Response>]),
    );

    const subscriptionCode = "SUBSCRIPTION_CODE";

    const expectedUrl =
      `${baseUrl}/subscription/${subscriptionCode}/manage/link`;

    await paystack.subscription.generateLink(subscriptionCode);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly send an update subscription link", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([Promise.resolve({
        json:
          async () => (await Promise.resolve({
            status: false,
            message: "Some message from server",
          })),
      }) as unknown as Promise<Response>]),
    );

    const subscriptionCode = "SUBSCRIPTION_CODE";

    const expectedUrl =
      `${baseUrl}/subscription/${subscriptionCode}/manage/email`;

    await paystack.subscription.sendLink(subscriptionCode);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
      body: JSON.stringify({}),
    }]);
  });
});
