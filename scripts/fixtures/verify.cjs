const assert = require("node:assert/strict");
const { createHmac } = require("node:crypto");

module.exports = async ({ Paystack, getPaystack }) => {
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
  const verified = client.webhook.verify({ rawBody, signature });
  assert.equal(verified.status, true);
  assert.equal(verified.event.data.reference, "ref_package_check");
  const ipChecked = new Paystack("sk_test_package_check", {
    webhook: { checkIp: true },
  });
  assert.equal(
    ipChecked.webhook.verify({ rawBody, signature }).reason,
    "missing_ip",
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
    const response = await client.transaction.initialize({
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
