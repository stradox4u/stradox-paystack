import { describe, expect, it } from "vitest";
import { Paystack } from "../../main.js";
const paystack = new Paystack(process.env.SECRET_KEY as string);

describe("Feature Tests for Apple Pay", () => {
  const domain = "example.com";
  const displayName = "example domain";

  it("Should register a domain for Apple Pay", async () => {
    const response = await paystack.applePay.register({
      domainName: domain,
      displayName,
    });

    if (response) {
      expect(response.status).toBe(false);
      expect(response.message).toBe(
        "Domain could not be registered on Apple Pay. Please verify that the correct file is hosted at https://example.com/.well-known/apple-developer-merchantid-domain-association",
      );
    }
  });

  it("Should correctly list domains for Apple Pay", async () => {
    const response = await paystack.applePay.list({
      use_cursor: false,
    });

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe("Apple Pay registered domains retrieved");
      expect(response.data).toHaveProperty("domainNames");
      expect(response.data.domainNames).toEqual([]);
    }
  });

  it("Should correctly unregister a domain for Apple Pay", async () => {
    const response = await paystack.applePay.unregister({
      domainName: domain,
    });

    if (response) {
      expect(response.status).toBe(true);
      expect(response.message).toBe(
        "Domain successfully unregistered on Apple Pay",
      );
    }
  });
});
