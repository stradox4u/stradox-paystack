import type { PaystackResponseInterface } from "../types/response.ts";
import type { ChargeAuthorizationBody, ExportTransactionQueries, InitializeTransactionBody, ListTransactionQueries, PartialDebitBody, TotalTransactionQueries } from "../types/transaction.ts";
import PaystackShared from "./paystackShared.ts";

/**
 * This class contains methods for working with the Transaction resource of the Paystack API
 */
export default class Transaction extends PaystackShared {
  private readonly resourceUrl = '/transaction';

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function initialize
   * @param {InitializeTransactionBody} body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public initialize = async (body: InitializeTransactionBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/initialize';
    const method = 'POST';
  
    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

   /**
   * @function verify
   * @param {string} reference
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public verify = async (reference: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/verify' + '/:reference';
    const method = 'GET';
  
    return await this.paystackFetch(url, method, {}, { reference });
  }

   /**
   * @function list
   * @param {ListTransactionQueries} queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListTransactionQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'GET';
  
    return await this.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

   /**
   * @function fetch
   * @param {string} transactionId
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetch = async (transactionId: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:transactionId';
    const method = 'GET';
  
    return await this.paystackFetch(url, method, {}, { transactionId});
  }

   /**
   * @function chargeAuthorization
   * @param {ChargeAuthorizationBody} body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public chargeAuthorization = async (body: ChargeAuthorizationBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/charge_authorization';
    const method = 'POST';
  
    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

   /**
   * @function timeline
   * @param {string} transactionIdOrReference
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public timeline = async (transactionIdOrReference: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/timeline' + '/:transactionIdOrReference';
    const method = 'GET';
  
    return await this.paystackFetch(url, method, {}, { transactionIdOrReference });
  }

   /**
   * @function totals
   * @param {TotalTransactionQueries} queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public totals = async (queries: TotalTransactionQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/totals';
    const method = 'GET';
  
    return await this.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

   /**
   * @function export
   * @param {ExportTransactionQueries} queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public export = async (queries: ExportTransactionQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/export';
    const method = 'GET';
  
    return await this.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

   /**
   * @function partialDebit
   * @param {PartialDebitBody} body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public partialDebit = async (body: PartialDebitBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/partial_debit';
    const method = 'POST';
  
    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }
}