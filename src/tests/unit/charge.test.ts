import { describe, it } from "jsr:@std/testing/bdd";
import { Paystack } from "../../main.ts";
import {
  assertSpyCallArgs,
  assertSpyCalls,
  returnsNext,
  stub,
} from "jsr:@std/testing/mock";

describe("Unit Tests for Charge", () => {
  const paystack = new Paystack(Deno.env.get("SECRET_KEY") as string);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a charge", async () => {
    using fetchStub = stub(
      globalThis,
      "fetch",
      returnsNext([
        Promise.resolve({
          json: async () =>
            await Promise.resolve({
              status: false,
              message: "Some message from server",
            }),
        }) as unknown as Promise<Response>,
      ]),
    );

    const body = {
      amount: 1_000_000,
      email: "johndoe@test.com",
      reference: "ref_01",
      metadata: {
        custom_fields: [
          {
            display_name: "Mobile Number",
            variable_name: "mobile_number",
            value: "+2348012345678",
          },
        ],
      },
    };

    const expectedUrl = `${baseUrl}/charge`;

    await paystack.charge.create(body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [
      expectedUrl,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    ]);
  });

  it("Should correctly submit a PIN", async () => {
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
      pin: "1234",
      reference: "ref_01",
    };

    const expectedUrl = `${baseUrl}/charge/submit_pin`;

    await paystack.charge.submitPin(body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [
      expectedUrl,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    ]);
  });

  it("Should correctly submit an OTP", async () => {
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
      otp: "123456",
      reference: "ref_01",
    };

    const expectedUrl = `${baseUrl}/charge/submit_otp`;

    await paystack.charge.submitOtp(body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [
      expectedUrl,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    ]);
  });

  it("Should correctly submit a phone number", async () => {
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
      phone: "+2348012345678",
      reference: "ref_01",
    };

    const expectedUrl = `${baseUrl}/charge/submit_phone`;

    await paystack.charge.submitPhone(body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [
      expectedUrl,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    ]);
  });

  it("Should correctly submit a birthday", async () => {
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
      birthday: "1990-01-01",
      reference: "ref_01",
    };

    const expectedUrl = `${baseUrl}/charge/submit_birthday`;

    await paystack.charge.submitBirthday(body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [
      expectedUrl,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    ]);
  });

  it("Should correctly submit an address", async () => {
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
      address: "123, Main Street, Lagos",
      reference: "ref_01",
      city: "Lagos",
      state: "Lagos",
      zipcode: "100001",
    };

    const expectedUrl = `${baseUrl}/charge/submit_address`;

    await paystack.charge.submitAddress(body);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [
      expectedUrl,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    ]);
  });

  it("Should correctly check a pending charge", async () => {
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

    const reference = "ref_01";

    const expectedUrl = `${baseUrl}/charge/${reference}`;

    await paystack.charge.checkPending(reference);

    assertSpyCalls(fetchStub, 1);
    assertSpyCallArgs(fetchStub, 0, [
      expectedUrl,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Deno.env.get("SECRET_KEY")}`,
          Accept: "application/json",
        },
      },
    ]);
  });
});
