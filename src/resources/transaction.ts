/**
 * @module Transaction
 * This module contains methods for interacting with the Transaction resource of the Paystack API
 * 
 */

import type { PaystackResponseInterface } from "../types/response.ts";
import type { ChargeAuthorizationBody, ExportTransactionQueries, InitializeTransactionBody, ListTransactionQueries, PartialDebitBody, TotalTransactionQueries } from "../types/transaction.ts";
import PaystackShared from "./paystackShared.ts";

export default class Transaction {
  private readonly rootUrl = '/transaction';
  private readonly tools: PaystackShared;

  constructor(secretKey: string) {
    this.tools = PaystackShared.getInstance(secretKey);
  }

  /**
   * @function initialize
   * @param {InitializeTransactionBody} body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public initialize = async (body: InitializeTransactionBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/initialize';
    const method = 'POST';
  
    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

   /**
   * @function verify
   * @param {string} reference
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public verify = async (reference: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/verify' + '/:reference';
    const method = 'GET';
  
    return await this.tools.paystackFetch(url, method, {}, { reference });
  }

   /**
   * @function list
   * @param {ListTransactionQueries} queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListTransactionQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl;
    const method = 'GET';
  
    return await this.tools.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

   /**
   * @function fetch
   * @param {string} transactionId
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetch = async (transactionId: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:transactionId';
    const method = 'GET';
  
    return await this.tools.paystackFetch(url, method, {}, { transactionId});
  }

   /**
   * @function charge_authorization
   * @param {ChargeAuthorizationBody} body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public charge_authorization = async (body: ChargeAuthorizationBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/charge_authorization';
    const method = 'POST';
  
    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

   /**
   * @function timeline
   * @param {string} transactionIdOrReference
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public timeline = async (transactionIdOrReference: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/timeline' + '/:transactionIdOrReference';
    const method = 'GET';
  
    return await this.tools.paystackFetch(url, method, {}, { transactionIdOrReference });
  }

   /**
   * @function totals
   * @param {TotalTransactionQueries} queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public totals = async (queries: TotalTransactionQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/totals';
    const method = 'GET';
  
    return await this.tools.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

   /**
   * @function export
   * @param {ExportTransactionQueries} queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public export = async (queries: ExportTransactionQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/export';
    const method = 'GET';
  
    return await this.tools.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

   /**
   * @function partial_debit
   * @param {PartialDebitBody} body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public partial_debit = async (body: PartialDebitBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/partial_debit';
    const method = 'POST';
  
    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }
}