import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
import { attachQueries } from "./handleQueries.js";

describe("Unit Tests for Subaccount", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a subaccount", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      business_name: "Business Name",
      bank_code: "057",
      account_number: "0000000000",
      percentage_charge: 5,
    };

    const expectedUrl = `${baseUrl}/subaccount`;

    await paystack.subaccount.create(body);

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

  it("Should correctly list subaccounts", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      perPage: 10,
      page: 1,
      from: new Date("2021-01-01"),
      to: new Date("2021-12-31"),
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/subaccount`);

    await paystack.subaccount.list(queries);

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

  it("Should correctly fetch a subaccount", async () => {
    const fetchStub = mockPaystackFetch();

    const subacctId = "SUBACCOUNT_ID";
    const expectedUrl = `${baseUrl}/subaccount/${subacctId}`;

    await paystack.subaccount.fetch(subacctId);

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

  it("Should correctly update a subaccount", async () => {
    const fetchStub = mockPaystackFetch();

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
});
