import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
import { attachQueries } from "./handleQueries.js";
describe("Unit Tests for Misc", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should properly list banks", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      country: "nigeria" as const,
      use_cursor: true,
      perPage: 25,
    };

    const expectedUrl = attachQueries(queries, `${baseUrl}/bank`);

    await paystack.misc.listBanks(queries);

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

  it("Should properly list countries", async () => {
    const fetchStub = mockPaystackFetch();

    const expectedUrl = `${baseUrl}/country`;

    await paystack.misc.listCountries();

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

  it("Should properly list states", async () => {
    const fetchStub = mockPaystackFetch();

    const queries = {
      country: "CA",
    };

    const expectedUrl = attachQueries(
      queries,
      `${baseUrl}/address_verification/states`,
    );

    await paystack.misc.listStates(queries);

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
});
