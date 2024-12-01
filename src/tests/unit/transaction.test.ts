import { describe, it } from "jsr:@std/testing/bdd";
import { Paystack } from "../../main.ts";
import {
  assertSpyCallArgs,
  assertSpyCalls,
  returnsNext,
  stub,
} from "jsr:@std/testing/mock";
import { attachQueries } from "./handleQueries.ts";

describe("Unit Tests for Transaction", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly initialize a transaction", async () => {
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
      amount: 500_000,
      email: "johndoe@test.com",
    };

    const expectedUrl = `${baseUrl}/transaction/initialize`;

    await paystack.transaction.initialize(body);

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

  it("Should correctly verify a transaction", async () => {
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

    const reference = "OPLKJHGF";

    const expectedUrl = `${baseUrl}/transaction/verify/${reference}`;

    await paystack.transaction.verify(reference);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly list transactions", async () => {
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
    };
    const expectedUrl = `${baseUrl}/transaction`;

    await paystack.transaction.list(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [
      `${expectedUrl}?perPage=${queries.perPage}&page=${queries.page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
          Accept: "application/json",
        },
      },
    ]);
  });

  it("Should correctly fetch a transaction", async () => {
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

    const transactionId = "OPLKJHGF";
    const expectedUrl = `${baseUrl}/transaction/${transactionId}`;

    await paystack.transaction.fetch(transactionId);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly charge an authorization", async () => {
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
      amount: (500_000).toString(),
      email: "johndoe@test.com",
      authorization_code: "AUTH_8dfhjjdt",
    };

    const expectedUrl = `${baseUrl}/transaction/charge_authorization`;

    await paystack.transaction.chargeAuthorization(body);

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

  it("Should correctly view transaction timeline", async () => {
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

    const transactionRef = "OPLKJHGF";
    const expectedUrl = `${baseUrl}/transaction/timeline/${transactionRef}`;

    await paystack.transaction.timeline(transactionRef);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly get transaction totals", async () => {
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
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/transaction/totals`);

    await paystack.transaction.totals(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly export transactions", async () => {
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
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/transaction/export`);

    await paystack.transaction.export(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly retrieve a partial debit", async () => {
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
      authorization_code: "AUTH_8dfhjjdt",
      amount: (500_000).toString(),
      currency: "NGN",
      email: "johndoe@test.com",
    };

    const expectedUrl = `${baseUrl}/transaction/partial_debit`;

    await paystack.transaction.partialDebit(body);

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
