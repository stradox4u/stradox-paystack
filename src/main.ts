/**
 * @module Paystack
 * This file is the entry point of the application
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

const pstack = Paystack("sk_test_0348f3eb56cd4a804f2f0a4381134d25a02cf85e");

const response = await pstack.split.fetch("SPL_cHDCCo4Rrp");

console.log({ response });
