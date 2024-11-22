/**
 * This module grants access to the Paystack object, with which we can access the various resources in the Paystack API
 * @module
 * 
 * @example
 * ```ts
 * import { Paystack } from "@stradox/paystack";
 * 
 * const paystack = new Paystack(<your_secret_key>);
 * 
 * const transaction = await paystack.transaction.initialize({
 *  amount: 10000,
 *  email: "johndoe@test.com",
 * });
 *
 * OR (to get a singleton instance of the Paystack class)
 * 
 * import { createPaystack } from "@stradox/paystack";
 * 
 * const paystack = createPaystack(<your_secret_key>);
 * 
 * const transaction = await paystack.transaction.initialize({
 *  amount: 10000,
 *  email: "johndoe@test.com",
 * });
 */

import Customer from "./resources/customer.ts";
import Split from "./resources/split.ts";
import Terminal from "./resources/terminal.ts";
import Transaction from './resources/transaction.ts';

/**
 * This class aggregates the various resources in the Paystack API, and methods for interacting with them
 */
export class Paystack {
  public transaction: Transaction;
  public split: Split;
  public terminal: Terminal;
  public customer: Customer;

  constructor(secretKey: string) {
    this.transaction = new Transaction(secretKey);
    this.split = new Split(secretKey);
    this.terminal = new Terminal(secretKey);
    this.customer = new Customer(secretKey);
  }
}

/**An instance of the Paystack class */
let paystackInstance: Paystack;

/**
 * This function grants access to the Paystack class, with which we can access the various resources in the Paystack API
 * @param {string} secretKey
 * @returns {Paystack}
 */
export function createPaystack(secretKey: string): Paystack {
  if (!paystackInstance) {
    paystackInstance = new Paystack(secretKey);
  }
  return paystackInstance;
}
