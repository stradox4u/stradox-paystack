import { Paystack, getPaystack } from "@stradox/paystack";
import type {
  InitiateTransferBody,
  InitiateTransferData,
  PaystackEvent,
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

function handleWebhook(rawBody: string, signature: string | null) {
  const result = client.webhook.verify({ rawBody, signature });
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
  webhook: { checkIp: true, ipAllowlist: ["52.31.139.75"] },
});
// @ts-expect-error ipAllowlist only applies when checkIp is true.
new Paystack("sk_test_types", { webhook: { ipAllowlist: ["52.31.139.75"] } });
void handleWebhook;
