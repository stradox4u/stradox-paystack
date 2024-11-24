import type { PaystackResponseInterface } from "../types/response.ts";
import type { BulkInitiateTransferBody, FinalizeTransferBody, InitiateTransferBody, ListTransferQueries } from "../types/transfer.ts";
import PaystackShared from "./paystackShared.ts";

export default class Transfer extends PaystackShared {
  private readonly resourceUrl = '/transfer';

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function initiate
   * Send money to your customers.
   * Status of transfer object returned will be `pending` if OTP is disabled.
   * In the event that an OTP is required, status will read `otp`.
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public initiate = async (body: InitiateTransferBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function finalize
   * Finalize an initiated transfer
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public finalize = async (body: FinalizeTransferBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/finalize_transfer';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function initiateBulk
   * Batch multiple transfers in a single request
   * You need to disable the Transfers OTP requirement to use this method
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public initiateBulk = async (body: BulkInitiateTransferBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/bulk';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function list
   * List the transfers made on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListTransferQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function fetch
   * Get the details of a transfer on your integration
   * @param idOrCode - The transfer ID or code you want to fetch
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetch = async (idOrCode: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:idOrCode';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { idOrCode });
  }

  /**
   * @function verify
   * Verify the status of a transfer on your integration
   * @param reference - Transfer reference
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public verify = async (reference: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/verify/:reference';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { reference });
  }
}