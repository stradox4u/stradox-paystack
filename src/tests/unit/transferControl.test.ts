import { describe, expect, it } from "vitest";
import { mockPaystackFetch, TEST_SECRET_KEY } from "./mockFetch.js";
import { Paystack } from "../../main.js";
describe("Unit Tests for Transfer Controls", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const baseUrl = "https://api.paystack.co";

  it("Should correctly check the balance", async () => {
    const fetchStub = mockPaystackFetch();

    const expectedUrl = `${baseUrl}/balance`;
    await paystack.transferControl.checkBalance();

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

  it("Should correctly fetch the balance ledger", async () => {
    const fetchStub = mockPaystackFetch();

    const expectedUrl = `${baseUrl}/balance/ledger`;
    await paystack.transferControl.fetchLedger();

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

  it("Should correctly resend the OTP", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      transfer_code: "transfer_code",
      reason: "resend_otp" as const,
    };

    const expectedUrl = `${baseUrl}/transfer/resend_otp`;
    await paystack.transferControl.resendOtp(body);

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

  it("Should correctly disable the OTP requirement", async () => {
    const fetchStub = mockPaystackFetch();

    const expectedUrl = `${baseUrl}/transfer/disable_otp`;
    await paystack.transferControl.disableOtp();

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
          },
          body: JSON.stringify({}),
        },
      ],
    );
  });

  it("Should correctly finalize the disabling of the OTP requirement", async () => {
    const fetchStub = mockPaystackFetch();

    const body = {
      otp: "otp",
    };

    const expectedUrl = `${baseUrl}/transfer/disable_otp_finalize`;
    await paystack.transferControl.finalizeDisableOtp(body);

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

  it("Should correctly enable the OTP requirement", async () => {
    const fetchStub = mockPaystackFetch();

    const expectedUrl = `${baseUrl}/transfer/enable_otp`;
    await paystack.transferControl.enableOtp();

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
          },
          body: JSON.stringify({}),
        },
      ],
    );
  });
});
