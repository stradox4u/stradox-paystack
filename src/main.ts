/**
 * This module grants access to the Paystack object, with which we can access the various resources in the Paystack API
 * @module
 * 
 * @example
 * ```ts
 * import * as Paystack from "@stradox/paystack";
 * 
 * const paystack = Paystack(<your_secret_key>);
 * 
 * const transaction = await paystack.transaction.initialize({
 *  amount: 10000,
 *  email: "johndoe@test.com",
 * });
 *
 */

import PaystackApi from "./paystackApi.ts";

let paystackInstance: PaystackApi;

/**
 * This function grants access to the Paystack object, with which we can access the various resources in the Paystack API
 * @param {string} secretKey
 * @returns {PaystackApi}
 */
export function Paystack(secretKey: string): PaystackApi {
  if (!paystackInstance) {
    paystackInstance = new PaystackApi(secretKey);
  }
  return paystackInstance;
}
