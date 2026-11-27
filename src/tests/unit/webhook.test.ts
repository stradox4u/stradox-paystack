import { createHmac } from "node:crypto";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  expectTypeOf,
  it,
  vi,
} from "vitest";
import { Paystack, createWebhookVerifier, getPaystack } from "../../main.js";
import type {
  ChargeSuccessEventData,
  InvoiceCreateEventData,
  PaystackOptions,
  SubscriptionExpiringCardsEventDatum,
  WebhookFailureReason,
  WebhookVerifier,
} from "../../main.js";
import { TEST_SECRET_KEY } from "./mockFetch.js";
import { chargeSuccess, invoiceCreate, sampleEvents } from "./webhookEvents.js";

const PAYSTACK_IPS = ["52.31.139.75", "52.49.173.169", "52.214.14.220"];
const SIGNING_SECRET = "whsec_test_webhook";
const SIGNED_AT = 1760270400;

function sign(body: string | Uint8Array, secretKey = TEST_SECRET_KEY) {
  return createHmac("sha512", secretKey).update(body).digest("hex");
}

function signedRequest(event: unknown = chargeSuccess) {
  const rawBody = JSON.stringify(event);
  return { rawBody, headers: { "x-paystack-signature": sign(rawBody) } };
}

function timestampedSignature(
  rawBody: string | Uint8Array,
  timestamp = SIGNED_AT,
  secret = SIGNING_SECRET,
  keyId = "whk_test",
) {
  const digest = createHmac("sha512", secret)
    .update(`${timestamp}.`)
    .update(rawBody)
    .digest("hex");
  return `t=${timestamp},v1=${keyId}:${digest}`;
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
      const { rawBody, headers } = signedRequest();
      for (const body of [
        Buffer.from(rawBody),
        new TextEncoder().encode(rawBody),
      ]) {
        expect(
          paystack.webhook.verify({ rawBody: body, headers }),
        ).toMatchObject({ status: true, event: chargeSuccess });
      }
    });

    it("Should reject a body that changed after it was signed", () => {
      const { rawBody, headers } = signedRequest();
      expect(
        paystack.webhook.verify({
          rawBody: rawBody.replace('"amount":10000', '"amount":1'),
          headers,
        }),
      ).toMatchObject({ status: false, reason: "invalid_signature" });
    });

    it("Should reject a signature made with a different secret key", () => {
      const { rawBody } = signedRequest();
      expect(
        paystack.webhook.verify({
          rawBody,
          headers: {
            "x-paystack-signature": sign(rawBody, "sk_test_someone_else"),
          },
        }),
      ).toMatchObject({ status: false, reason: "invalid_signature" });
    });

    it.each([undefined, null, "", []].map((signature) => ({ signature })))(
      "Should report a missing signature for $signature",
      ({ signature }) => {
        const { rawBody } = signedRequest();
        expect(
          paystack.webhook.verify({
            rawBody,
            headers: { "x-paystack-signature": signature },
          }),
        ).toEqual({
          status: false,
          reason: "missing_signature",
          message: expect.any(String),
        });
      },
    );

    it("Should reject a signature header sent more than once", () => {
      const { rawBody, headers } = signedRequest();
      const signature = headers["x-paystack-signature"];
      expect(
        paystack.webhook.verify({
          rawBody,
          headers: { "x-paystack-signature": [signature, signature] },
        }),
      ).toMatchObject({ status: false, reason: "invalid_signature" });
    });

    it("Should throw when given a parsed body", () => {
      const { rawBody, headers } = signedRequest();
      expect(() =>
        paystack.webhook.verify({
          rawBody: JSON.parse(rawBody) as unknown as string,
          headers,
        }),
      ).toThrow(TypeError);
    });

    it.each(["not json", "[]", "null", '{"data":{}}'])(
      "Should report a correctly signed body that isn't an Event: %s",
      (rawBody) => {
        expect(
          paystack.webhook.verify({
            rawBody,
            headers: { "x-paystack-signature": sign(rawBody) },
          }),
        ).toMatchObject({ status: false, reason: "invalid_payload" });
      },
    );
  });

  describe("timestamped signature", () => {
    const client = new Paystack(TEST_SECRET_KEY, {
      webhook: { signingSecret: SIGNING_SECRET },
    });
    const standalone = createWebhookVerifier({ signingSecret: SIGNING_SECRET });
    const legacyRequest = signedRequest();
    const { rawBody } = legacyRequest;

    beforeEach(() => {
      vi.useFakeTimers({ toFake: ["Date"] });
      vi.setSystemTime(SIGNED_AT * 1000);
    });

    afterEach(() => vi.useRealTimers());

    it.each([
      ["the client", client.webhook],
      ["the standalone verifier", standalone],
    ] as const)(
      "Should verify a timestamped signature through %s",
      (_entryPoint, verifier) => {
        const body = Buffer.from(rawBody);
        expect(
          verifier.verify({
            rawBody: body,
            headers: { "paystack-signature": timestampedSignature(body) },
          }),
        ).toEqual({ status: true, event: chargeSuccess });
      },
    );

    it("Should verify every signature entry against the configured secret during rotation", () => {
      const oldSecret = "whsec_old_webhook";
      const oldVerifier = createWebhookVerifier({ signingSecret: oldSecret });
      const oldSignature = timestampedSignature(
        rawBody,
        SIGNED_AT,
        oldSecret,
        "whk_old",
      );
      const newEntry = timestampedSignature(rawBody).split(",")[1];
      const request = {
        rawBody,
        headers: {
          "paystack-signature": `${oldSignature},v2=unused, ${newEntry}`,
        },
      };

      expect(oldVerifier.verify(request).status).toBe(true);
      expect(standalone.verify(request).status).toBe(true);
    });

    it.each([-300, 300])(
      "Should accept a timestamp offset of %i seconds",
      (offset) => {
        expect(
          standalone.verify({
            rawBody,
            headers: {
              "paystack-signature": timestampedSignature(
                rawBody,
                SIGNED_AT + offset,
              ),
            },
          }).status,
        ).toBe(true);
      },
    );

    it.each([-301, 301])(
      "Should reject a timestamp offset of %i seconds even with a valid legacy signature",
      (offset) => {
        expect(
          client.webhook.verify({
            rawBody,
            headers: {
              ...legacyRequest.headers,
              "paystack-signature": timestampedSignature(
                rawBody,
                SIGNED_AT + offset,
              ),
            },
          }),
        ).toMatchObject({ status: false, reason: "invalid_signature" });
      },
    );

    it("Should require the current header even with a valid legacy signature", () => {
      expect(client.webhook.verify(legacyRequest)).toMatchObject({
        status: false,
        reason: "missing_signature",
      });
      expect(paystack.webhook.verify(legacyRequest).status).toBe(true);
    });

    it("Should reject a signature from another signing secret even with a valid legacy signature", () => {
      expect(
        client.webhook.verify({
          rawBody,
          headers: {
            ...legacyRequest.headers,
            "paystack-signature": timestampedSignature(
              rawBody,
              SIGNED_AT,
              "whsec_other",
            ),
          },
        }),
      ).toMatchObject({ status: false, reason: "invalid_signature" });
    });

    it("Should verify the raw bytes before parsing the Event", () => {
      const body = Buffer.from(` ${rawBody}\n`);
      const headers = { "paystack-signature": timestampedSignature(body) };
      expect(standalone.verify({ rawBody: body, headers }).status).toBe(true);
      expect(standalone.verify({ rawBody, headers })).toMatchObject({
        status: false,
        reason: "invalid_signature",
      });
    });

    const validSignature = timestampedSignature(rawBody);
    it.each([
      ["with an empty value", ""],
      ["with no signature entry", `t=${SIGNED_AT}`],
      ["with an invalid digest", `t=${SIGNED_AT},v1=whk_test:abc`],
      ["without a timestamp", validSignature.replace(`t=${SIGNED_AT},`, "")],
      [
        "with an invalid timestamp",
        validSignature.replace(`t=${SIGNED_AT}`, "t=NaN"),
      ],
      ["with a repeated timestamp", `${validSignature},t=${SIGNED_AT}`],
      ["sent more than once", [validSignature, validSignature]],
    ] as const)("Should reject a current header %s", (_case, signature) => {
      expect(
        client.webhook.verify({
          rawBody,
          headers: {
            ...legacyRequest.headers,
            "paystack-signature": signature,
          },
        }),
      ).toMatchObject({ status: false, reason: "invalid_signature" });
    });

    it("Should apply the standalone verifier's IP allowlist", () => {
      const verifier = createWebhookVerifier({
        signingSecret: SIGNING_SECRET,
        checkIp: true,
        ipAllowlist: ["203.0.113.9"],
      });
      const request = {
        rawBody,
        headers: { "paystack-signature": timestampedSignature(rawBody) },
      };
      expect(
        verifier.verify({ ...request, ip: PAYSTACK_IPS[0] }),
      ).toMatchObject({
        status: false,
        reason: "ip_not_allowlisted",
      });
      expect(verifier.verify({ ...request, ip: "203.0.113.9" }).status).toBe(
        true,
      );
    });
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
          headers: { "x-paystack-signature": "bad" },
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
    it.each(["", "whsec_", "sk_test_other", "whsec_contains whitespace"])(
      "Should throw for an invalid signing secret: %j",
      (signingSecret) => {
        expect(() => createWebhookVerifier({ signingSecret })).toThrow(
          TypeError,
        );
        expect(
          () => new Paystack(TEST_SECRET_KEY, { webhook: { signingSecret } }),
        ).toThrow(TypeError);
      },
    );

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

    it("Should expose the same verifier interface for both entry points", () => {
      expectTypeOf(paystack.webhook).toEqualTypeOf<WebhookVerifier>();
      expectTypeOf(
        createWebhookVerifier,
      ).returns.toEqualTypeOf<WebhookVerifier>();
    });
  });
});
