import { describe, it } from "@std/testing/bdd";
import { stub, assertSpyCalls, assertSpyCallArgs, returnsNext } from "@std/testing/mock";
import { Paystack } from "../../main.ts";

describe("Unit: Apple Pay", () => {
  const domain = 'example.com';
  const displayName = 'example domain';
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  
  it("Should register a domain for Apple Pay", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: false, message: "Domain could not be registered on Apple Pay. Please verify that the correct file is hosted at https://example.com/.well-known/apple-developer-merchantid-domain-association" })),
    }) as unknown as Promise<Response>]));


    await paystack.applePay.register({
      domainName: domain,
      displayName,
    });

    const expectedUrl = `${baseUrl}/apple-pay/domain`;

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: 'POST',
      body: JSON.stringify({ domainName: domain, displayName }),
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    }]);
  });

  it("Should correctly list domains for Apple Pay", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: true, message: "Domains retrieved" })),
    }) as unknown as Promise<Response>]));

    await paystack.applePay.list({
      use_cursor: false,
    });

    const expectedUrl = `${baseUrl}/apple-pay/domain?use_cursor=false`;

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        Accept: 'application/json',
      }
    }]);
  });

  it("Should correctly unregister a domain for Apple Pay", async () => {
    using fetchStub = stub(globalThis, 'fetch', returnsNext([Promise.resolve({
      json: async () => (await Promise.resolve({ status: true, message: "Domain deregistered successfully" })),
    }) as unknown as Promise<Response>]));

    await paystack.applePay.unregister({
      domainName: domain,
    });

    const expectedUrl = `${baseUrl}/apple-pay/domain`;

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [expectedUrl, {
      method: 'DELETE',
      body: JSON.stringify({ domainName: domain }),
      headers: {
        Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    }]);
  });
});