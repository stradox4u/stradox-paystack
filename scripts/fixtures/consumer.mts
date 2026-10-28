import { Paystack, getPaystack } from "@stradox/paystack";
import type {
  InitiateTransferBody,
  InitiateTransferData,
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
