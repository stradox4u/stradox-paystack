import { describe, it } from "@std/testing/bdd";
import { Paystack } from "../../main.ts";
import {
  assertSpyCallArgs,
  assertSpyCalls,
  returnsNext,
  stub,
} from "@std/testing/mock";
import { attachQueries } from "./handleQueries.ts";

describe("Unit Tests for Settlement", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly lists settlements", async () => {
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
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/settlement`);

    await paystack.settlement.list(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly list a settlement's transactions", async () => {
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
    };
    const settlementId = "123";
    const expectedUrl = attachQueries(
      queries,
      `${baseUrl}/settlement/${settlementId}/transactions`,
    );

    await paystack.settlement.listTransactions(settlementId, queries);

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
