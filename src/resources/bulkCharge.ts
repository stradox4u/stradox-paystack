import type { FetchChargesQueries, InitiateBulkCharge } from "../types/bulkCharge.ts";
import type { PaginatedDateRangedList } from "../types/common.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class BulkCharge extends PaystackShared {
  private readonly resourceUrl = '/bulkcharge';

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function initiate
   * Send an array of objects with authorization codes and amount, using the supported
   * currency format, so we can process transactions as a batch.
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public initiate = async (body: InitiateBulkCharge[]): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'POST';

    const bodyString = JSON.stringify('{' + JSON.stringify(body) + '}');

    return await this.paystackFetch(url, method, bodyString);
  }

  /**
   * @function listBatches
   * This lists all bulk charge batches created by the integration. Statuses can be `active`,
   * `paused` or `complete`.
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public listBatches = async (queries: PaginatedDateRangedList): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function fetchBatch
   * This retrieves a specific batch code. It also returns useful information on its progress by way
   * of the `total_charges` and `pending_charges` attributes.
   * @param idOrCode - An ID or code for the charge whose batches you want to retrieve
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetchBath = async (idOrCode: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:idOrCode';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { idOrCode });
  }

  /**
   * @function fetchCharges
   * This retrieves the charges associated with a specified batch code. Pagination parameters are available.
   * You can also filter by status. Charge statuses can be `pending`, `success`, or `failed`.
   * @param idOrCode - An ID or code for the charge whose batches you want to retrieve
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetchCharges = async (idOrCode: string, queries: FetchChargesQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:idOrCode/charges';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { idOrCode }, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function pauseBatch
   * This pauses processing of a batch
   * @param batchCode - The batch code for the bulk charge you want to pause
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public pauseBatch = async (batchCode: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/pause/:batchCode';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { batchCode });
  }

  /**
   * @function resumeBatch
   * This resumes processing of a batch
   * @param batchCode - The batch code for the bulk charge you want to resume
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public resumeBatch = async (batchCode: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/resume/:batchCode';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { batchCode });
  }
}