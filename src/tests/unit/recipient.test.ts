import { describe, it } from "jsr:@std/testing/bdd";
import { Paystack } from "../../main.ts";
import {
  assertSpyCallArgs,
  assertSpyCalls,
  returnsNext,
  stub,
} from "jsr:@std/testing/mock";
import { faker } from "npm:@faker-js/faker";
import { attachQueries } from "./handleQueries.ts";

describe("Unit Tests for Transfer Recipient", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a transfer recipient", async () => {
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
      type: "nuban" as const,
      name: faker.person.fullName(),
      account_number: faker.finance.accountNumber(),
      bank_code: "057",
    };

    const expectedUrl = `${baseUrl}/transferrecipient`;

    await paystack.recipient.create(body);

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

  it("Should correctly create transfer recipients in bulk", async () => {
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
      batch: [
        {
          type: "nuban" as const,
          name: faker.person.fullName(),
          account_number: faker.finance.accountNumber(),
          bank_code: "057",
        },
        {
          type: "nuban" as const,
          name: faker.person.fullName(),
          account_number: faker.finance.accountNumber(),
          bank_code: "057",
        },
      ],
    };

    const expectedUrl = `${baseUrl}/transferrecipient/bulk`;

    await paystack.recipient.bulkCreate(body);

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

  it("Should correctly list transfer recipients", async () => {
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

    const expectedUrl = attachQueries(queries, `${baseUrl}/transferrecipient`);

    await paystack.recipient.list(queries);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly fetch a transfer recipient", async () => {
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

    const recipientCode = faker.string.alphanumeric(10);
    const expectedUrl = `${baseUrl}/transferrecipient/${recipientCode}`;

    await paystack.recipient.fetch(recipientCode);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: "application/json",
      },
    }]);
  });

  it("Should correctly update a transfer recipient", async () => {
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

    const recipientCode = faker.string.alphanumeric(10);

    const body = {
      name: faker.person.fullName(),
    };
    const expectedUrl = `${baseUrl}/transferrecipient/${recipientCode}`;

    await paystack.recipient.update(recipientCode, body);

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

  it("Should correctly delete a transfer recipient", async () => {
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

    const recipientCode = faker.string.alphanumeric(10);
    const expectedUrl = `${baseUrl}/transferrecipient/${recipientCode}`;

    await paystack.recipient.delete(recipientCode);

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
});
