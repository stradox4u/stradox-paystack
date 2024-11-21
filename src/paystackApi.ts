import Split from "./resources/split.ts";
import Transaction from './resources/transaction.ts';

export default class PaystackApi {
  private secretKey: string;
  public transaction: Transaction;
  public split: Split;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
    this.transaction = new Transaction(secretKey);
    this.split = new Split(secretKey);
  }
}