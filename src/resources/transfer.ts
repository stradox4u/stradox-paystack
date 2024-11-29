import type { PaystackResponseInterface } from "../types/response.ts";
import type {
  BulkInitiateTransferBody,
  BulkInitiateTransferDatum,
  FetchTransferData,
  FinalizeTransferBody,
  FinalizeTransferData,
  InitiateTransferBody,
  InitiateTransferData,
  ListTransferQueries,
  ListTransfersDatum,
  ListTransfersMeta,
  VerifyTransferData,
} from "../types/transfer.ts";
import PaystackShared from "./paystackShared.ts";

export default class Transfer extends PaystackShared {
  private readonly resourceUrl = "/transfer";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function initiate
   * Send money to your customers.
   * Status of transfer object returned will be `pending` if OTP is disabled.
   * In the event that an OTP is required, status will read `otp`.
   * @param body
   * @returns {Promise<PaystackResponseInterface<InitiateTransferData> | null>} response - A promise that resolves to an object with a data property of type InitiateTransferData
   */
  public initiate = async (
    body: InitiateTransferBody,
  ): Promise<PaystackResponseInterface<InitiateTransferData> | null> => {
    const url = this.resourceUrl;
    const method = "POST";

    return await this.paystackFetch<InitiateTransferData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function finalize
   * Finalize an initiated transfer
   * @param body
   * @returns {Promise<PaystackResponseInterface<FinalizeTransferData> | null>} response - A promise that resolves to an object with a data property of type FinalizeTransferData
   */
  public finalize = async (
    body: FinalizeTransferBody,
  ): Promise<PaystackResponseInterface<FinalizeTransferData> | null> => {
    const url = this.resourceUrl + "/finalize_transfer";
    const method = "POST";

    return await this.paystackFetch<FinalizeTransferData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function initiateBulk
   * Batch multiple transfers in a single request
   * You need to disable the Transfers OTP requirement to use this method
   * @param body
   * @returns {Promise<PaystackResponseInterface<BulkInitiateTransferDatum[]> | null>} response - A promise that resolves to an object with a data property of type BulkInitiateTransferDatum[]
   */
  public initiateBulk = async (
    body: BulkInitiateTransferBody,
  ): Promise<PaystackResponseInterface<BulkInitiateTransferDatum[]> | null> => {
    const url = this.resourceUrl + "/bulk";
    const method = "POST";

    return await this.paystackFetch<BulkInitiateTransferDatum[]>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function list
   * List the transfers made on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListTransfersDatum[], ListTransfersMeta> | null>} response - A promise that resolves to an object with a data property of type ListTransfersDatum[] and a meta property of type ListTransfersMeta
   */
  public list = async (
    queries: ListTransferQueries,
  ): Promise<
    PaystackResponseInterface<ListTransfersDatum[], ListTransfersMeta> | null
  > => {
    const url = this.resourceUrl;
    const method = "GET";

    return await this.paystackFetch<ListTransfersDatum[], ListTransfersMeta>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function fetch
   * Get the details of a transfer on your integration
   * @param idOrCode - The transfer ID or code you want to fetch
   * @returns {Promise<PaystackResponseInterface<FetchTransferData> | null>} response - A promise that resolves to an object with a data property of type FetchTransferData
   */
  public fetch = async (
    idOrCode: string,
  ): Promise<PaystackResponseInterface<FetchTransferData> | null> => {
    const url = this.resourceUrl + "/:idOrCode";
    const method = "GET";

    return await this.paystackFetch<FetchTransferData>(url, method, {}, {
      idOrCode,
    });
  };

  /**
   * @function verify
   * Verify the status of a transfer on your integration
   * @param reference - Transfer reference
   * @returns {Promise<PaystackResponseInterface<VerifyTransferData> | null>} response - A promise that resolves to an object with a data property of type VerifyTransferData
   */
  public verify = async (
    reference: string,
  ): Promise<PaystackResponseInterface<VerifyTransferData> | null> => {
    const url = this.resourceUrl + "/verify/:reference";
    const method = "GET";

    return await this.paystackFetch<VerifyTransferData>(url, method, {}, {
      reference,
    });
  };
}
