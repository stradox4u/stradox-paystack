import type { AddEvidenceBody, ExportDisputeQueries, GetUploadUrlQueries, ListDisputeQueries, ResolveDisputeBody, UpdateDisputeBody } from "../types/dispute.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class Dispute extends PaystackShared {
  private readonly resourceUrl = '/dispute';

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function list
   * List disputes filed against you
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListDisputeQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function fetch
   * Get more details about a dispute
   * @param disputeId - The dispute ID you want to fetch
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetch = async (disputeId: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:disputeId';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { disputeId });
  }

  /**
   * @function listTransactionDisputes
   * Retrieves disputes for a particular transaction
   * @param transactionId - The transaction ID you want to fetch
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public listTransactionDisputes = async (transactionId: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/transaction/:transactionId';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { transactionId });
  }

  /**
   * @function update
   * Update the details of a dispute on your integration
   * @param disputeId - The dispute ID you want to update
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public update = async (disputeId: string, body: UpdateDisputeBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:disputeId';
    const method = 'PUT';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>, { disputeId });
  }

  /**
   * @function addEvidence
   * Provide evidence for a dispute
   * @param disputeId - The dispute ID you want to add evidence to
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public addEvidence = async (disputeId: string, body: AddEvidenceBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:disputeId/evidence';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>, { disputeId });
  }

  /**
   * @function getUploadUrl
   * Get a URL to upload evidence for a dispute
   * @param disputeId - The dispute ID you want to get an upload URL for
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public getUploadUrl = async (disputeId: string, queries: GetUploadUrlQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:disputeId/upload_url';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { disputeId }, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function resolve
   * Resolve a dispute on your integration
   * @param disputeId - The dispute ID you want to resolve
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public resolve = async (disputeId: string, body: ResolveDisputeBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:disputeId/resolve';
    const method = 'PUT';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>, { disputeId });
  }

  /**
   * @function export
   * Export disputes available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public export = async (queries: ExportDisputeQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/export';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }
}