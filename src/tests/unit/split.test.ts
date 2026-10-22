import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
import { attachQueries } from "./handleQueries.js";

describe("Unit Tests for Transaction Split", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a transaction split", async () => {
    const fetchStub = mockPaystackFetch();

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

  it("Should correctly list transaction splits", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      page: 1,
      perPage: 10,
      active: true,
      name: "Some name",
    };
    const expectedUrl = attachQueries(queries, `${baseUrl}/split`);

    await paystack.split.list(queries);

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

  it("Should correctly fetch a transaction split", async () => {
    const fetchStub = mockPaystackFetch();

    const id = "SPL_8f4s1eq7ml6rlzj";
    const expectedUrl = `${baseUrl}/split/${id}`;

    await paystack.split.fetch(id);

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

  it("Should correctly update a transaction split", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      name: "Some other name",
      active: false,
    };
    const id = "SPL_8f4s1eq7ml6rlzj";
    const expectedUrl = `${baseUrl}/split/${id}`;

    await paystack.split.update(id, body);

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

  it("Should correctly add a subaccount to a transaction split", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      subaccount: "ACCT_8f4s1eq7ml6rlzj",
      share: 20,
    };
    const splitId = "SPL_8f4s1eq7ml6rlzj";
    const expectedUrl = `${baseUrl}/split/${splitId}/subaccount/add`;

    await paystack.split.addSubaccountSplit(splitId, body);

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

  it("Should correctly remove a subaccount from a transaction split", async () => {
    const fetchStub = mockPaystackFetch();

    const body = { subaccount: "ACCT_8f4s1eq7ml6rlzj" };
    const splitId = "SPL_8f4s1eq7ml6rlzj";
    const expectedUrl = `${baseUrl}/split/${splitId}/subaccount/remove`;

    await paystack.split.removeSubaccountSplit(splitId, body);

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
});
