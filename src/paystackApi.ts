import Split from "./resources/split.ts";
import Transaction from './resources/transaction.ts';

/**
 * This class aggregates the various resources in the Paystack API, and methods for interacting with them
 */
export default class PaystackApi {
  public transaction: Transaction;
  public split: Split;

  constructor(secretKey: string) {
    this.transaction = new Transaction(secretKey);
    this.split = new Split(secretKey);
  }
}