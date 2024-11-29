import type {
  AddEvidenceBody,
  AddEvidenceData,
  ExportDisputeQueries,
  ExportDisputesData,
  GetUploadUrlData,
  GetUploadUrlQueries,
  ListDisputeData,
  ListDisputeMeta,
  ListDisputeQueries,
  ListTransactionDisputesData,
  ResolveDisputeBody,
  ResolveDisputeData,
  UpdateDisputeBody,
  UpdateDisputeData,
} from "../types/dispute.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class Dispute extends PaystackShared {
  private readonly resourceUrl = "/dispute";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function list
   * List disputes filed against you
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListDisputeData[], ListDisputeMeta> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListDisputeData[]
   */
  public list = async (
    queries: ListDisputeQueries,
  ): Promise<
    PaystackResponseInterface<ListDisputeData[], ListDisputeMeta> | null
  > => {
    const url = this.resourceUrl;
    const method = "GET";

    return await this.paystackFetch<ListDisputeData[], ListDisputeMeta>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function fetch
   * Get more details about a dispute
   * @param disputeId - The dispute ID you want to fetch
   * @returns {Promise<PaystackResponseInterface<ListDisputeData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListDisputeData
   */
  public fetch = async (
    disputeId: string,
  ): Promise<PaystackResponseInterface<ListDisputeData> | null> => {
    const url = this.resourceUrl + "/:disputeId";
    const method = "GET";

    return await this.paystackFetch<ListDisputeData>(url, method, {}, {
      disputeId,
    });
  };

  /**
   * @function listTransactionDisputes
   * Retrieves disputes for a particular transaction
   * @param transactionId - The transaction ID you want to fetch
   * @returns {Promise<PaystackResponseInterface<ListTransactionDisputesData[]> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListTransactionDisputesData[]
   */
  public listTransactionDisputes = async (
    transactionId: string,
  ): Promise<
    PaystackResponseInterface<ListTransactionDisputesData[]> | null
  > => {
    const url = this.resourceUrl + "/transaction/:transactionId";
    const method = "GET";

    return await this.paystackFetch<ListTransactionDisputesData[]>(
      url,
      method,
      {},
      { transactionId },
    );
  };

  /**
   * @function update
   * Update the details of a dispute on your integration
   * @param disputeId - The dispute ID you want to update
   * @param body
   * @returns {Promise<PaystackResponseInterface<UpdateDisputeData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type UpdateDisputeData
   */
  public update = async (
    disputeId: string,
    body: UpdateDisputeBody,
  ): Promise<PaystackResponseInterface<UpdateDisputeData> | null> => {
    const url = this.resourceUrl + "/:disputeId";
    const method = "PUT";

    return await this.paystackFetch<UpdateDisputeData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { disputeId },
    );
  };

  /**
   * @function addEvidence
   * Provide evidence for a dispute
   * @param disputeId - The dispute ID you want to add evidence to
   * @param body
   * @returns {Promise<PaystackResponseInterface<AddEvidenceData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type AddEvidenceData
   */
  public addEvidence = async (
    disputeId: string,
    body: AddEvidenceBody,
  ): Promise<PaystackResponseInterface<AddEvidenceData> | null> => {
    const url = this.resourceUrl + "/:disputeId/evidence";
    const method = "POST";

    return await this.paystackFetch<AddEvidenceData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { disputeId },
    );
  };

  /**
   * @function getUploadUrl
   * Get a URL to upload evidence for a dispute
   * @param disputeId - The dispute ID you want to get an upload URL for
   * @param queries
   * @returns {Promise<PaystackResponseInterface<GetUploadUrlData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type GetUploadUrlData
   */
  public getUploadUrl = async (
    disputeId: string,
    queries: GetUploadUrlQueries,
  ): Promise<PaystackResponseInterface<GetUploadUrlData> | null> => {
    const url = this.resourceUrl + "/:disputeId/upload_url";
    const method = "GET";

    return await this.paystackFetch<GetUploadUrlData>(url, method, {}, {
      disputeId,
    }, queries as unknown as Record<string, unknown>);
  };

  /**
   * @function resolve
   * Resolve a dispute on your integration
   * @param disputeId - The dispute ID you want to resolve
   * @param body
   * @returns {Promise<PaystackResponseInterface<ResolveDisputeData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ResolveDisputeData
   */
  public resolve = async (
    disputeId: string,
    body: ResolveDisputeBody,
  ): Promise<PaystackResponseInterface<ResolveDisputeData> | null> => {
    const url = this.resourceUrl + "/:disputeId/resolve";
    const method = "PUT";

    return await this.paystackFetch<ResolveDisputeData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { disputeId },
    );
  };

  /**
   * @function export
   * Export disputes available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ExportDisputesData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ExportDisputesData
   */
  public export = async (
    queries: ExportDisputeQueries,
  ): Promise<PaystackResponseInterface<ExportDisputesData> | null> => {
    const url = this.resourceUrl + "/export";
    const method = "GET";

    return await this.paystackFetch<ExportDisputesData>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };
}
