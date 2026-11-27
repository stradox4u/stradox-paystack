const assert = require("node:assert/strict");
const { createHmac } = require("node:crypto");

module.exports = async ({ Paystack, createWebhookVerifier, getPaystack }) => {
  const client = new Paystack("sk_test_package_check");
  assert(client instanceof Paystack);
  assert(getPaystack("sk_test_package_check") instanceof Paystack);
  assert.equal(
    getPaystack("sk_test_package_check"),
    getPaystack("sk_test_package_check"),
  );
  const rawBody = JSON.stringify({
    event: "charge.success",
    data: { reference: "ref_package_check" },
  });
  const signature = createHmac("sha512", "sk_test_package_check")
    .update(rawBody)
    .digest("hex");
  const legacyRequest = {
    rawBody,
    headers: { "x-paystack-signature": signature },
  };
  const verified = client.webhook.verify(legacyRequest);
  assert.equal(verified.status, true);
  assert.equal(verified.event.data.reference, "ref_package_check");
  const ipChecked = new Paystack("sk_test_package_check", {
    webhook: { checkIp: true },
  });
  assert.equal(ipChecked.webhook.verify(legacyRequest).reason, "missing_ip");

  const signingSecret = "whsec_package_check";
  const timestamp = Math.floor(Date.now() / 1000);
  const digest = createHmac("sha512", signingSecret)
    .update(`${timestamp}.`)
    .update(rawBody)
    .digest("hex");
  const currentRequest = {
    rawBody,
    headers: {
      ...legacyRequest.headers,
      "paystack-signature": `t=${timestamp},v1=whk_package_check:${digest}`,
    },
  };
  const signedClient = new Paystack("sk_test_package_check", {
    webhook: { signingSecret },
  });
  const verifier = createWebhookVerifier({ signingSecret });
  assert.deepEqual(signedClient.webhook.verify(currentRequest), verified);
  assert.deepEqual(verifier.verify(currentRequest), verified);
  assert.equal(
    signedClient.webhook.verify(legacyRequest).reason,
    "missing_signature",
  );

  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls++;
    assert.equal(url, "https://api.paystack.co/transaction/initialize");
    assert.equal(options.method, "POST");
    assert.equal(options.headers.Authorization, "Bearer sk_test_package_check");
    assert.deepEqual(JSON.parse(options.body), {
      amount: 10000,
      email: "package@example.com",
    });
    return new Response(
      JSON.stringify({
        status: true,
        message: "Authorization URL created",
        data: { authorization_url: "https://example.com/checkout" },
      }),
    );
  };
  try {
    const response = await signedClient.transaction.initialize({
      amount: 10000,
      email: "package@example.com",
    });
    assert.equal(
      response.data.authorization_url,
      "https://example.com/checkout",
    );
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
};
