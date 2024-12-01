import { describe, it } from "jsr:@std/testing/bdd";
import { Paystack } from "../../main.ts";
import {
  assertSpyCallArgs,
  assertSpyCalls,
  returnsNext,
  stub,
} from "jsr:@std/testing/mock";
import { attachQueries } from "./handleQueries.ts";

describe("Unit Tests for Transaction Split", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a transaction split", async () => {
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
      name: "Some name",
      type: "percentage" as const,
      currency: "NGN",
      subaccounts: [
        {
          subaccount: "ACCT_8f4s1eq7ml6rlzj",
          share: 0.2,
        },
        {
          subaccount: "ACCT_8f4s2eq7ml6rlzj",
          share: 0.8,
        },
      ],
      bearer_type: "all" as const,
      bearer_subaccount: "ACCT_8f4s1eq7ml6rlzj",
    };

    const expectedUrl = `${baseUrl}/split`;

    await paystack.split.create(body);

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

  it("Should correctly list transaction splits", async () => {
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
      page: 1,
      perPage: 10,
      active: true,
      name: "Some name",
    };
    const expectedUrl = attachQueries(queries, `${baseUrl}/split`);

    await paystack.split.list(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly fetch a transaction split", async () => {
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

    const id = "SPL_8f4s1eq7ml6rlzj";
    const expectedUrl = `${baseUrl}/split/${id}`;

    await paystack.split.fetch(id);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly update a transaction split", async () => {
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
      name: "Some other name",
      active: false,
    };
    const id = "SPL_8f4s1eq7ml6rlzj";
    const expectedUrl = `${baseUrl}/split/${id}`;

    await paystack.split.update(id, body);

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

  it("Should correctly add a subaccount to a transaction split", async () => {
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
      subaccount: "ACCT_8f4s1eq7ml6rlzj",
      share: 20,
    };
    const splitId = "SPL_8f4s1eq7ml6rlzj";
    const expectedUrl = `${baseUrl}/split/${splitId}/subaccount/add`;

    await paystack.split.addSubaccountSplit(splitId, body);

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

  it("Should correctly remove a subaccount from a transaction split", async () => {
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

    const body = { subaccount: "ACCT_8f4s1eq7ml6rlzj" };
    const splitId = "SPL_8f4s1eq7ml6rlzj";
    const expectedUrl = `${baseUrl}/split/${splitId}/subaccount/remove`;

    await paystack.split.removeSubaccountSplit(splitId, body);

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
