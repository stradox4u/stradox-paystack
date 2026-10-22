import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
describe("Unit Tests for Charge", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly create a charge", async () => {
    const fetchStub = mockPaystackFetch();

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

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly submit a PIN", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      pin: "1234",
      reference: "ref_01",
    };

    const expectedUrl = `${baseUrl}/charge/submit_pin`;

    await paystack.charge.submitPin(body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly submit an OTP", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      otp: "123456",
      reference: "ref_01",
    };

    const expectedUrl = `${baseUrl}/charge/submit_otp`;

    await paystack.charge.submitOtp(body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly submit a phone number", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      phone: "+2348012345678",
      reference: "ref_01",
    };

    const expectedUrl = `${baseUrl}/charge/submit_phone`;

    await paystack.charge.submitPhone(body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly submit a birthday", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      birthday: "1990-01-01",
      reference: "ref_01",
    };

    const expectedUrl = `${baseUrl}/charge/submit_birthday`;

    await paystack.charge.submitBirthday(body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly submit an address", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      address: "123, Main Street, Lagos",
      reference: "ref_01",
      city: "Lagos",
      state: "Lagos",
      zipcode: "100001",
    };

    const expectedUrl = `${baseUrl}/charge/submit_address`;

    await paystack.charge.submitAddress(body);

    expect(fetchStub).toHaveBeenCalledTimes(1);
    expect(fetchStub).toHaveBeenNthCalledWith(
      1,
      ...[
        expectedUrl,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      ],
    );
  });

  it("Should correctly check a pending charge", async () => {
    const fetchStub = mockPaystackFetch();

    const reference = "ref_01";

    const expectedUrl = `${baseUrl}/charge/${reference}`;

    await paystack.charge.checkPending(reference);

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
