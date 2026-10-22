import { Paystack, getPaystack } from "@stradox/paystack";

const client: Paystack = getPaystack("sk_test_types");
const request = () =>
  client.transaction.initialize({ amount: 10000, email: "types@example.com" });
async function verifyTypes() {
  const response = await request();
  if (response) {
    const url: string = response.data.authorization_url;
    return url;
  }
}
// @ts-expect-error An email is required to initialize a transaction.
client.transaction.initialize({ amount: 10000 });
void verifyTypes;
