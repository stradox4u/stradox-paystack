import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
import { attachQueries } from "./handleQueries.js";
import { faker } from "@faker-js/faker";

describe("Unit Tests for Verification", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly resolve account", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      account_number: "0022728151",
      bank_code: "063",
    };
    const expectedUrl = attachQueries(queries, `${baseUrl}/bank/resolve`);

    await paystack.verification.resolveAccount(queries);

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

  it("Should correctly validate account", async () => {
    const fetchStub = mockPaystackFetch();

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

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      ],
    );
  });

  it("Should correctly resolve card bin", async () => {
    const fetchStub = mockPaystackFetch();

    const bin = "539920";

    await paystack.verification.resolveBin(bin);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        `${baseUrl}/decision/bin/${bin}`,
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
});
