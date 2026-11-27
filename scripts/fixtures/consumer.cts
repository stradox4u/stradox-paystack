import {
  Paystack,
  createWebhookVerifier,
  getPaystack,
} from "@stradox/paystack";
import type {
  InitiateTransferBody,
  InitiateTransferData,
  PaystackEvent,
  WebhookSignatureHeaders,
  WebhookVerifier,
} from "@stradox/paystack";

const client: Paystack = getPaystack("sk_test_types");
const transferBody: InitiateTransferBody = {
  source: "balance",
  amount: 10000,
  recipient: "RCP_example",
};
const request = () =>
  client.transaction.initialize({ amount: 10000, email: "types@example.com" });
async function verifyTypes() {
  const transfer = await client.transfer.initiate(transferBody);
  if (transfer) {
    const data: InitiateTransferData = transfer.data;
    const code: string = data.transfer_code;
    void code;
  }
  const response = await request();
  if (response) {
    const url: string = response.data.authorization_url;
    return url;
  }
}
// @ts-expect-error An email is required to initialize a transaction.
client.transaction.initialize({ amount: 10000 });
void verifyTypes;

const verifier: WebhookVerifier = createWebhookVerifier({
  signingSecret: "whsec_types",
});
function handleWebhook(rawBody: string, headers: WebhookSignatureHeaders) {
  const result = verifier.verify({ rawBody, headers });
  if (!result.status) return result.reason;
  const event: PaystackEvent = result.event;
  switch (event.event) {
    case "charge.success":
      return event.data.reference;
    case "transfer.failed":
      return event.data.transfer_code;
    default:
      return undefined;
  }
}
new Paystack("sk_test_types", {
  webhook: {
    signingSecret: "whsec_types",
    checkIp: true,
    ipAllowlist: ["52.31.139.75"],
  },
});
// @ts-expect-error The standalone verifier requires a signing secret.
createWebhookVerifier({ checkIp: true });
// @ts-expect-error ipAllowlist only applies when checkIp is true.
new Paystack("sk_test_types", { webhook: { ipAllowlist: ["52.31.139.75"] } });
void handleWebhook;
