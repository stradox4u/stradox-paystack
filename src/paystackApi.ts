/**
 * @module
 * This module bundles together all the resources in the Paystack API
 */

import Split from "./resources/split.ts";
import Transaction from './resources/transaction.ts';

export default class PaystackApi {
  public transaction: Transaction;
  public split: Split;

  constructor(secretKey: string) {
    this.transaction = new Transaction(secretKey);
    this.split = new Split(secretKey);
  }
}