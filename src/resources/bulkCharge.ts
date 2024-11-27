import type {
  FetchBatchData,
  FetchChargesData,
  FetchChargesQueries,
  InitiateBulkCharge,
  InitiateBulkChargeData,
  ListBatchesData,
} from "../types/bulkCharge.ts";
import type { PaginatedDateRangedList } from "../types/common.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class BulkCharge extends PaystackShared {
  private readonly resourceUrl = "/bulkcharge";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function initiate
   * Send an array of objects with authorization codes and amount, using the supported
   * currency format, so we can process transactions as a batch.
   * @param body
   * @returns {Promise<PaystackResponseInterface<InitiateBulkChargeData> | null>} response - A promise that resolves to an object containing the initiated bulk charge
   */
  public initiate = async (
    body: InitiateBulkCharge[],
  ): Promise<PaystackResponseInterface<InitiateBulkChargeData> | null> => {
    const url = this.resourceUrl;
    const method = "POST";

    const bodyString = JSON.stringify("{" + JSON.stringify(body) + "}");

    return await this.paystackFetch<InitiateBulkChargeData>(
      url,
      method,
      bodyString,
    );
  };

  /**
   * @function listBatches
   * This lists all bulk charge batches created by the integration. Statuses can be `active`,
   * `paused` or `complete`.
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListBatchesData[]> | null>} response - A promise that resolves to an object containing an array of batch data
   */
  public listBatches = async (
    queries: PaginatedDateRangedList,
  ): Promise<PaystackResponseInterface<ListBatchesData[]> | null> => {
    const url = this.resourceUrl;
    const method = "GET";

    return await this.paystackFetch<ListBatchesData[]>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function fetchBatch
   * This retrieves a specific batch code. It also returns useful information on its progress by way
   * of the `total_charges` and `pending_charges` attributes.
   * @param idOrCode - An ID or code for the charge whose batches you want to retrieve
   * @returns {Promise<PaystackResponseInterface<FetchBatchData> | null>} response - A promise that resolves to an object containing the batch's details
   */
  public fetchBatch = async (
    idOrCode: string,
  ): Promise<PaystackResponseInterface<FetchBatchData> | null> => {
    const url = this.resourceUrl + "/:idOrCode";
    const method = "GET";

    return await this.paystackFetch<FetchBatchData>(url, method, {}, {
      idOrCode,
    });
  };

  /**
   * @function fetchCharges
   * This retrieves the charges associated with a specified batch code. Pagination parameters are available.
   * You can also filter by status. Charge statuses can be `pending`, `success`, or `failed`.
   * @param idOrCode - An ID or code for the charge whose batches you want to retrieve
   * @param queries
   * @returns {Promise<PaystackResponseInterface<FetchChargesData[]> | null>} response - A promise that resolves to an object containing array of the charges in a batch
   */
  public fetchCharges = async (
    idOrCode: string,
    queries: FetchChargesQueries,
  ): Promise<PaystackResponseInterface<FetchChargesData[]> | null> => {
    const url = this.resourceUrl + "/:idOrCode/charges";
    const method = "GET";

    return await this.paystackFetch<FetchChargesData[]>(url, method, {}, {
      idOrCode,
    }, queries as unknown as Record<string, unknown>);
  };

  /**
   * @function pauseBatch
   * This pauses processing of a batch
   * @param batchCode - The batch code for the bulk charge you want to pause
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} status - A promise that resolves to an object containing the status and a message
   */
  public pauseBatch = async (
    batchCode: string,
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/pause/:batchCode";
    const method = "GET";

    return await this.paystackFetch<undefined>(url, method, {}, { batchCode });
  };

  /**
   * @function resumeBatch
   * This resumes processing of a batch
   * @param batchCode - The batch code for the bulk charge you want to resume
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} status - A promise that resolves to an object containing the status and a message
   */
  public resumeBatch = async (
    batchCode: string,
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/resume/:batchCode";
    const method = "GET";

    return await this.paystackFetch<undefined>(url, method, {}, { batchCode });
  };
}
