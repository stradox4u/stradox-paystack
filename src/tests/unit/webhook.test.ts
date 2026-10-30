import { createHmac } from "node:crypto";
import { describe, expect, expectTypeOf, it } from "vitest";
import { Paystack, getPaystack } from "../../main.js";
import type {
  ChargeSuccessEventData,
  InvoiceCreateEventData,
  PaystackOptions,
  SubscriptionExpiringCardsEventDatum,
  WebhookFailureReason,
} from "../../main.js";
import { TEST_SECRET_KEY } from "./mockFetch.js";
import { chargeSuccess, invoiceCreate, sampleEvents } from "./webhookEvents.js";

const PAYSTACK_IPS = ["52.31.139.75", "52.49.173.169", "52.214.14.220"];

function sign(body: string | Uint8Array, secretKey = TEST_SECRET_KEY) {
  return createHmac("sha512", secretKey).update(body).digest("hex");
}

function signedRequest(event: unknown = chargeSuccess) {
  const rawBody = JSON.stringify(event);
  return { rawBody, signature: sign(rawBody) };
}

describe("Unit Tests for Webhook", () => {
  const paystack = new Paystack(TEST_SECRET_KEY);
  const ipChecked = new Paystack(TEST_SECRET_KEY, {
    webhook: { checkIp: true },
  });

  describe("signature", () => {
    it("Should return every documented Event when correctly signed", () => {
      for (const event of sampleEvents) {
        expect(paystack.webhook.verify(signedRequest(event))).toEqual({
          status: true,
          event,
        });
      }
    });

    it("Should accept the raw body as a Buffer or Uint8Array", () => {
      const { rawBody, signature } = signedRequest();
      for (const body of [
        Buffer.from(rawBody),
        new TextEncoder().encode(rawBody),
      ]) {
        expect(
          paystack.webhook.verify({ rawBody: body, signature }),
        ).toMatchObject({ status: true, event: chargeSuccess });
      }
    });

    it("Should reject a body that changed after it was signed", () => {
      const { rawBody, signature } = signedRequest();
      expect(
        paystack.webhook.verify({
          rawBody: rawBody.replace('"amount":10000', '"amount":1'),
          signature,
        }),
      ).toMatchObject({ status: false, reason: "invalid_signature" });
    });

    it("Should reject a signature made with a different secret key", () => {
      const { rawBody } = signedRequest();
      expect(
        paystack.webhook.verify({
          rawBody,
          signature: sign(rawBody, "sk_test_someone_else"),
        }),
      ).toMatchObject({ status: false, reason: "invalid_signature" });
    });

    it.each([undefined, null, "", []])(
      "Should report a missing signature for %j",
      (signature) => {
        const { rawBody } = signedRequest();
        expect(paystack.webhook.verify({ rawBody, signature })).toEqual({
          status: false,
          reason: "missing_signature",
          message: expect.any(String),
        });
      },
    );

    it("Should reject a signature header sent more than once", () => {
      const { rawBody, signature } = signedRequest();
      expect(
        paystack.webhook.verify({ rawBody, signature: [signature, signature] }),
      ).toMatchObject({ status: false, reason: "invalid_signature" });
    });

    it("Should throw when given a parsed body", () => {
      const { rawBody, signature } = signedRequest();
      expect(() =>
        paystack.webhook.verify({
          rawBody: JSON.parse(rawBody) as unknown as string,
          signature,
        }),
      ).toThrow(TypeError);
    });

    it.each(["not json", "[]", "null", '{"data":{}}'])(
      "Should report a correctly signed body that isn't an Event: %s",
      (rawBody) => {
        expect(
          paystack.webhook.verify({ rawBody, signature: sign(rawBody) }),
        ).toMatchObject({ status: false, reason: "invalid_payload" });
      },
    );
  });

  describe("IP allowlist", () => {
    it("Should ignore the ip when checkIp is off", () => {
      expect(
        paystack.webhook.verify({ ...signedRequest(), ip: "203.0.113.9" }),
      ).toMatchObject({ status: true });
    });

    it.each(PAYSTACK_IPS)("Should accept Paystack's address %s", (ip) => {
      expect(
        ipChecked.webhook.verify({ ...signedRequest(), ip }),
      ).toMatchObject({ status: true });
    });

    it("Should accept an IPv4 address reported in IPv6 form", () => {
      expect(
        ipChecked.webhook.verify({
          ...signedRequest(),
          ip: "::ffff:52.31.139.75",
        }),
      ).toMatchObject({ status: true });
    });

    it("Should reject an address that isn't on the allowlist", () => {
      expect(
        ipChecked.webhook.verify({ ...signedRequest(), ip: "203.0.113.9" }),
      ).toMatchObject({ status: false, reason: "ip_not_allowlisted" });
    });

    it.each([undefined, ""])("Should report a missing ip for %j", (ip) => {
      expect(
        ipChecked.webhook.verify({ ...signedRequest(), ip }),
      ).toMatchObject({ status: false, reason: "missing_ip" });
    });

    it("Should check the ip before the signature", () => {
      expect(
        ipChecked.webhook.verify({
          rawBody: "{}",
          signature: "bad",
          ip: "203.0.113.9",
        }),
      ).toMatchObject({ status: false, reason: "ip_not_allowlisted" });
    });

    it("Should replace Paystack's addresses with a supplied allowlist", () => {
      const custom = new Paystack(TEST_SECRET_KEY, {
        webhook: { checkIp: true, ipAllowlist: ["10.0.0.1", "2001:db8::1"] },
      });
      for (const ip of ["10.0.0.1", "::ffff:10.0.0.1", "2001:db8::1"]) {
        expect(custom.webhook.verify({ ...signedRequest(), ip })).toMatchObject(
          { status: true },
        );
      }
      expect(
        custom.webhook.verify({ ...signedRequest(), ip: PAYSTACK_IPS[0] }),
      ).toMatchObject({ status: false, reason: "ip_not_allowlisted" });
    });
  });

  describe("options", () => {
    it.each([[[]], [["not-an-ip"]], [["10.0.0.1", "10.0.0.300"]]])(
      "Should throw for the ipAllowlist %j",
      (ipAllowlist) => {
        expect(
          () =>
            new Paystack(TEST_SECRET_KEY, {
              webhook: { checkIp: true, ipAllowlist },
            }),
        ).toThrow(TypeError);
      },
    );

    it("Should throw when ipAllowlist is supplied without checkIp", () => {
      const options = {
        webhook: { ipAllowlist: ["10.0.0.1"] },
      } as unknown as PaystackOptions;
      expect(() => new Paystack(TEST_SECRET_KEY, options)).toThrow(TypeError);
    });

    it("Should apply options passed to getPaystack", () => {
      const client = getPaystack(TEST_SECRET_KEY, {
        webhook: { checkIp: true },
      });
      expect(client.webhook.verify(signedRequest())).toMatchObject({
        status: false,
        reason: "missing_ip",
      });
    });
  });

  describe("types", () => {
    it("Should narrow an Event's data on its event type", () => {
      const result = paystack.webhook.verify(signedRequest());
      if (!result.status) {
        expectTypeOf(result.reason).toEqualTypeOf<WebhookFailureReason>();
        throw new Error(result.message);
      }
      const { event } = result;
      if (event.event === "charge.success") {
        expectTypeOf(event.data).toEqualTypeOf<ChargeSuccessEventData>();
      }
      if (event.event === "subscription.expiring_cards") {
        expectTypeOf(event.data).toEqualTypeOf<
          SubscriptionExpiringCardsEventDatum[]
        >();
      }
      expect(event.event).toBe("charge.success");
    });

    it("Should narrow an object Paystack sometimes sends empty", () => {
      const data: InvoiceCreateEventData = invoiceCreate.data;
      expectTypeOf(data.transaction.amount).toEqualTypeOf<number | undefined>();
      if (data.transaction.reference !== undefined) {
        expectTypeOf(data.transaction.amount).toEqualTypeOf<number>();
      }
      expect(data.transaction.amount).toBe(50000);
    });

    it("Should only allow ipAllowlist alongside checkIp: true", () => {
      const allowed: PaystackOptions[] = [
        { webhook: { checkIp: true, ipAllowlist: ["10.0.0.1"] } },
        // @ts-expect-error ipAllowlist needs checkIp: true
        { webhook: { ipAllowlist: ["10.0.0.1"] } },
        // @ts-expect-error ipAllowlist needs checkIp: true
        { webhook: { checkIp: false, ipAllowlist: ["10.0.0.1"] } },
      ];
      expect(allowed).toHaveLength(3);
    });

    it("Should keep the signature and IP checks private", () => {
      // @ts-expect-error verifySignature is private
      expect(typeof paystack.webhook.verifySignature).toBe("function");
    });
  });
});
