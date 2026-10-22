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
 * import { getPaystack } from "@stradox/paystack";
 *
 * const paystack = getPaystack(<your_secret_key>);
 *
 * const transaction = await paystack.transaction.initialize({
 *  amount: 10000,
 *  email: "johndoe@test.com",
 * });
 */

import Customer from "./resources/customer.js";
import Split from "./resources/split.js";
import Terminal from "./resources/terminal.js";
import Transaction from "./resources/transaction.js";
import VirtualAccount from "./resources/virtualAccount.js";
import ApplePay from "./resources/applePay.js";
import Subaccount from "./resources/subaccount.js";
import Plan from "./resources/plan.js";
import Subscription from "./resources/subscription.js";
import Product from "./resources/product.js";
import PaymentPage from "./resources/paymentPage.js";
import PaymentRequest from "./resources/paymentRequest.js";
import Settlement from "./resources/settlement.js";
import Recipient from "./resources/recipient.js";
import Transfer from "./resources/transfer.js";
import TransferControl from "./resources/transferControl.js";
import BulkCharge from "./resources/bulkCharge.js";
import Integration from "./resources/integration.js";
import Charge from "./resources/charge.js";
import Dispute from "./resources/dispute.js";
import Refund from "./resources/refund.js";
import Verification from "./resources/verification.js";
import Misc from "./resources/misc.js";

/**
 * This class aggregates the various resources in the Paystack API, and methods for interacting with them
 */
export class Paystack {
  public transaction: Transaction;
  public split: Split;
  public terminal: Terminal;
  public customer: Customer;
  public virtualAccount: VirtualAccount;
  public applePay: ApplePay;
  public subaccount: Subaccount;
  public plan: Plan;
  public subscription: Subscription;
  public product: Product;
  public paymentPage: PaymentPage;
  public paymentRequest: PaymentRequest;
  public settlement: Settlement;
  public recipient: Recipient;
  public transfer: Transfer;
  public transferControl: TransferControl;
  public bulkCharge: BulkCharge;
  public integration: Integration;
  public charge: Charge;
  public dispute: Dispute;
  public refund: Refund;
  public verification: Verification;
  public misc: Misc;

  private static paystackInstance: Paystack;

  constructor(secretKey: string) {
    this.transaction = new Transaction(secretKey);
    this.split = new Split(secretKey);
    this.terminal = new Terminal(secretKey);
    this.customer = new Customer(secretKey);
    this.virtualAccount = new VirtualAccount(secretKey);
    this.applePay = new ApplePay(secretKey);
    this.subaccount = new Subaccount(secretKey);
    this.plan = new Plan(secretKey);
    this.subscription = new Subscription(secretKey);
    this.product = new Product(secretKey);
    this.paymentPage = new PaymentPage(secretKey);
    this.paymentRequest = new PaymentRequest(secretKey);
    this.settlement = new Settlement(secretKey);
    this.recipient = new Recipient(secretKey);
    this.transfer = new Transfer(secretKey);
    this.transferControl = new TransferControl(secretKey);
    this.bulkCharge = new BulkCharge(secretKey);
    this.integration = new Integration(secretKey);
    this.charge = new Charge(secretKey);
    this.dispute = new Dispute(secretKey);
    this.refund = new Refund(secretKey);
    this.verification = new Verification(secretKey);
    this.misc = new Misc(secretKey);
  }

  /**
   * @function getInstance
   * This method creates and returns a singleton instance of the Paystack class
   * @param secretKey
   * @returns {Paystack}
   */
  public static getInstance(secretKey: string): Paystack {
    if (!Paystack.paystackInstance) {
      Paystack.paystackInstance = new Paystack(secretKey);
    }
    return Paystack.paystackInstance;
  }
}

/**
 * @function getPaystack
 * This function gives us an instance the Paystack class, with which we can access the various resources in the Paystack API
 * @param {string} secretKey
 * @returns {Paystack}
 */
export function getPaystack(secretKey: string): Paystack {
  return Paystack.getInstance(secretKey);
}
