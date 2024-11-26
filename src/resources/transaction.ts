import type { PaystackResponseInterface } from "../types/response.ts";
import type {
  ChargeAuthorizationBody,
  ChargeAuthorizationData,
  ExportTransactionData,
  ExportTransactionQueries,
  FetchTransactionData,
  InitializeTransactionBody,
  InitializeTransactionData,
  ListTransactionData,
  ListTransactionQueries,
  PartialDebitBody,
  PartialDebitData,
  TotalTransactionQueries,
  TransactionTimelineData,
  TransactionTotalsData,
  VerifyTransactionData,
} from "../types/transaction.ts";
import PaystackShared from "./paystackShared.ts";

/**
 * This class contains methods for working with the Transaction resource of the Paystack API
 */
export default class Transaction extends PaystackShared {
  private readonly resourceUrl = "/transaction";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function initialize
   * @param {InitializeTransactionBody} body
   * @returns {Promise<PaystackResponseInterface<InitializeTransactionData> | null>} transactionData - The transaction data
   */
  public initialize = async (
    body: InitializeTransactionBody,
  ): Promise<PaystackResponseInterface<InitializeTransactionData> | null> => {
    const url = this.resourceUrl + "/initialize";
    const method = "POST";

    return await this.paystackFetch<InitializeTransactionData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function verify
   * @param {string} reference
   * @returns {Promise<PaystackResponseInterface<VerifyTransactionData> | null>} verificationData - A promise resolving to the verification data
   */
  public verify = async (
    reference: string,
  ): Promise<PaystackResponseInterface<VerifyTransactionData> | null> => {
    const url = this.resourceUrl + "/verify" + "/:reference";
    const method = "GET";

    return await this.paystackFetch<VerifyTransactionData>(url, method, {}, {
      reference,
    });
  };

  /**
   * @function list
   * @param {ListTransactionQueries} queries
   * @returns {Promise<PaystackResponseInterface<ListTransactionData[]> | null>} transactionData - A promise resolving to an array of transaction data
   */
  public list = async (
    queries: ListTransactionQueries,
  ): Promise<PaystackResponseInterface<ListTransactionData[]> | null> => {
    const url = this.resourceUrl;
    const method = "GET";

    return await this.paystackFetch<ListTransactionData[]>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function fetch
   * @param {string} transactionId
   * @returns {Promise<PaystackResponseInterface<FetchTransactionData> | null>} transactionData - A promise resolving to the transaction data
   */
  public fetch = async (
    transactionId: string,
  ): Promise<PaystackResponseInterface<FetchTransactionData> | null> => {
    const url = this.resourceUrl + "/:transactionId";
    const method = "GET";

    return await this.paystackFetch<FetchTransactionData>(url, method, {}, {
      transactionId,
    });
  };

  /**
   * @function chargeAuthorization
   * @param {ChargeAuthorizationBody} body
   * @returns {Promise<PaystackResponseInterface<ChargeAuthorizationData> | null>} authorizationData - A promise resolving to the authorization data
   */
  public chargeAuthorization = async (
    body: ChargeAuthorizationBody,
  ): Promise<PaystackResponseInterface<ChargeAuthorizationData> | null> => {
    const url = this.resourceUrl + "/charge_authorization";
    const method = "POST";

    return await this.paystackFetch<ChargeAuthorizationData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function timeline
   * @param {string} transactionIdOrReference
   * @returns {Promise<PaystackResponseInterface<TransactionTimelineData> | null>} timelineData - A promise resolving to the timeline of the transaction
   */
  public timeline = async (
    transactionIdOrReference: string,
  ): Promise<PaystackResponseInterface<TransactionTimelineData> | null> => {
    const url = this.resourceUrl + "/timeline" + "/:transactionIdOrReference";
    const method = "GET";

    return await this.paystackFetch<TransactionTimelineData>(url, method, {}, {
      transactionIdOrReference,
    });
  };

  /**
   * @function totals
   * @param {TotalTransactionQueries} queries
   * @returns {Promise<PaystackResponseInterface<TransactionTotalsData> | null>} transactionTotals - A promise resolving to the totals of all the transactions
   */
  public totals = async (
    queries: TotalTransactionQueries,
  ): Promise<PaystackResponseInterface<TransactionTotalsData> | null> => {
    const url = this.resourceUrl + "/totals";
    const method = "GET";

    return await this.paystackFetch<TransactionTotalsData>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function export
   * @param {ExportTransactionQueries} queries
   * @returns {Promise<PaystackResponseInterface<ExportTransactionData> | null>} exportData - A promise resolving to the exported transaction data, including a download url and an expiry date
   */
  public export = async (
    queries: ExportTransactionQueries,
  ): Promise<PaystackResponseInterface<ExportTransactionData> | null> => {
    const url = this.resourceUrl + "/export";
    const method = "GET";

    return await this.paystackFetch<ExportTransactionData>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function partialDebit
   * @param {PartialDebitBody} body
   * @returns {Promise<PaystackResponseInterface<PartialDebitData> | null>} partialDebitData - A promise resolving to the data describing the partial debit transaction
   */
  public partialDebit = async (
    body: PartialDebitBody,
  ): Promise<PaystackResponseInterface<PartialDebitData> | null> => {
    const url = this.resourceUrl + "/partial_debit";
    const method = "POST";

    return await this.paystackFetch<PartialDebitData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };
}
