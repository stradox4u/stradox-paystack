import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";

describe("Unit Tests for Apple Pay", () => {
  const domain = "example.com";
  const displayName = "example domain";
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should register a domain for Apple Pay", async () => {
    const fetchStub = mockPaystackFetch({
      status: false,
      message:
        "Domain could not be registered on Apple Pay. Please verify that the correct file is hosted at https://example.com/.well-known/apple-developer-merchantid-domain-association",
    });

    await paystack.applePay.register({
      domainName: domain,
      displayName,
    });

    const expectedUrl = `${baseUrl}/apple-pay/domain`;

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          body: JSON.stringify({ domainName: domain, displayName }),
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly list domains for Apple Pay", async () => {
    const fetchStub = mockPaystackFetch({
      status: true,
      message: "Domains retrieved",
    });

    await paystack.applePay.list({
      use_cursor: false,
    });

    const expectedUrl = `${baseUrl}/apple-pay/domain?use_cursor=false`;

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

  it("Should correctly unregister a domain for Apple Pay", async () => {
    const fetchStub = mockPaystackFetch({
      status: true,
      message: "Domain deregistered successfully",
    });

    await paystack.applePay.unregister({
      domainName: domain,
    });

    const expectedUrl = `${baseUrl}/apple-pay/domain`;

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "DELETE",
          body: JSON.stringify({ domainName: domain }),
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      ],
    );
  });
});
