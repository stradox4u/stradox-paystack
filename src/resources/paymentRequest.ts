import type { CreatePaymentRequestBody, FinalizePaymentRequestBody, ListPaymentRequestQueries, UpdatePaymentRequestBody } from "../types/paymentRequest.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class PaymentRequest extends PaystackShared {
  private readonly resourceUrl = '/paymentrequest';

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Create a payment request for a transaction on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public create = async (body: CreatePaymentRequestBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function list
   * List the payment requests available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListPaymentRequestQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function fetch
   * Get the details of a payment request on your integration
   * @param idOrCode - The payment request `ID` or `code` you want to fetch
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetch = async (idOrCode: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:idOrCode';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { idOrCode });
  }

  /**
   * @function verify
   * Verify the details of a payment request on your integration
   * @param code - Payment request code
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public verify = async (code: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/verify/:code';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { code });
  }

  /**
   * @function sendNotification
   * Send notification of a payment request to your customers
   * @param code - Payment request code
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public sendNotification = async (code: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/notify/:code';
    const method = 'POST';

    return await this.paystackFetch(url, method, {}, { code });
  }

  /**
   * @function requestTotal
   * Get payment requests metric
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public requestTotal = async (): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/totals';
    const method = 'GET';

    return await this.paystackFetch(url, method, {});
  }

  /**
   * @function finalize
   * Finalize a draft payment request
   * @param code - Payment request code
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public finalize = async (code: string, body: FinalizePaymentRequestBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/finalize/:code';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>, { code });
  }

  /**
   * @function update
   * Update a payment request's details on your integration
   * @param idOrCode - Payment request `ID` or `code`
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public update = async (idOrCode: string, body: UpdatePaymentRequestBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:idOrCode';
    const method = 'PUT';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>, { idOrCode });
  }

  /**
   * @function archive
   * Used to archive a payment request. A payment request will no longer be fetched on list or returned on verify.
   * @param code - Payment request code
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public archive = async (code: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/archive/:code';
    const method = 'POST';

    return await this.paystackFetch(url, method, {}, { code });
  }
}