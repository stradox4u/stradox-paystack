import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
import { faker } from "@faker-js/faker";
import { attachQueries } from "./handleQueries.js";

describe("Unit Tests for Transfer Recipient", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a transfer recipient", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      type: "nuban" as const,
      name: faker.person.fullName(),
      account_number: faker.finance.accountNumber(),
      bank_code: "057",
    };

    const expectedUrl = `${baseUrl}/transferrecipient`;

    await paystack.recipient.create(body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        },
      ],
    );
  });

  it("Should correctly create transfer recipients in bulk", async () => {
    const fetchStub = mockPaystackFetch();

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

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        },
      ],
    );
  });

  it("Should correctly list transfer recipients", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      perPage: 10,
      page: 1,
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/transferrecipient`);

    await paystack.recipient.list(queries);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly fetch a transfer recipient", async () => {
    const fetchStub = mockPaystackFetch();

    const recipientCode = faker.string.alphanumeric(10);
    const expectedUrl = `${baseUrl}/transferrecipient/${recipientCode}`;

    await paystack.recipient.fetch(recipientCode);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly update a transfer recipient", async () => {
    const fetchStub = mockPaystackFetch();

    const recipientCode = faker.string.alphanumeric(10);

    const body = {
      name: faker.person.fullName(),
    };
    const expectedUrl = `${baseUrl}/transferrecipient/${recipientCode}`;

    await paystack.recipient.update(recipientCode, body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        },
      ],
    );
  });

  it("Should correctly delete a transfer recipient", async () => {
    const fetchStub = mockPaystackFetch();

    const recipientCode = faker.string.alphanumeric(10);
    const expectedUrl = `${baseUrl}/transferrecipient/${recipientCode}`;

    await paystack.recipient.delete(recipientCode);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
          },
          body: JSON.stringify({}),
        },
      ],
    );
  });
});
