import type {
  CreatePaymentRequestBody,
  CreatePaymentRequestData,
  FetchPaymentRequestData,
  FinalizePaymentRequestBody,
  FinalizePaymentRequestData,
  ListPaymentRequestDatum,
  ListPaymentRequestMeta,
  ListPaymentRequestQueries,
  RequestTotalData,
  UpdatePaymentRequestBody,
  UpdatePaymentRequestData,
  VerifyPaymentRequestData,
} from "../types/paymentRequest.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class PaymentRequest extends PaystackShared {
  private readonly resourceUrl = "/paymentrequest";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Create a payment request for a transaction on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface<CreatePaymentRequestData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type CreatePaymentRequestData
   */
  public create = async (
    body: CreatePaymentRequestBody,
  ): Promise<PaystackResponseInterface<CreatePaymentRequestData> | null> => {
    const url = this.resourceUrl;
    const method = "POST";

    return await this.paystackFetch<CreatePaymentRequestData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function list
   * List the payment requests available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListPaymentRequestDatum[], ListPaymentRequestMeta> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListPaymentRequestDatum[]
   */
  public list = async (
    queries: ListPaymentRequestQueries,
  ): Promise<
    | PaystackResponseInterface<
      ListPaymentRequestDatum[],
      ListPaymentRequestMeta
    >
    | null
  > => {
    const url = this.resourceUrl;
    const method = "GET";

    return await this.paystackFetch<
      ListPaymentRequestDatum[],
      ListPaymentRequestMeta
    >(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  };

  /**
   * @function fetch
   * Get the details of a payment request on your integration
   * @param idOrCode - The payment request `ID` or `code` you want to fetch
   * @returns {Promise<PaystackResponseInterface<FetchPaymentRequestData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type FetchPaymentRequestData
   */
  public fetch = async (
    idOrCode: string,
  ): Promise<PaystackResponseInterface<FetchPaymentRequestData> | null> => {
    const url = this.resourceUrl + "/:idOrCode";
    const method = "GET";

    return await this.paystackFetch<FetchPaymentRequestData>(url, method, {}, {
      idOrCode,
    });
  };

  /**
   * @function verify
   * Verify the details of a payment request on your integration
   * @param code - Payment request code
   * @returns {Promise<PaystackResponseInterface<VerifyPaymentRequestData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type VerifyPaymentRequestData
   */
  public verify = async (
    code: string,
  ): Promise<PaystackResponseInterface<VerifyPaymentRequestData> | null> => {
    const url = this.resourceUrl + "/verify/:code";
    const method = "GET";

    return await this.paystackFetch<VerifyPaymentRequestData>(url, method, {}, {
      code,
    });
  };

  /**
   * @function sendNotification
   * Send notification of a payment request to your customers
   * @param code - Payment request code
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a boolean status property and a message property
   */
  public sendNotification = async (
    code: string,
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/notify/:code";
    const method = "POST";

    return await this.paystackFetch<undefined>(url, method, {}, { code });
  };

  /**
   * @function requestTotal
   * Get payment requests metric
   * @returns {Promise<PaystackResponseInterface<RequestTotalData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type RequestTotalData
   */
  public requestTotal = async (): Promise<
    PaystackResponseInterface<RequestTotalData> | null
  > => {
    const url = this.resourceUrl + "/totals";
    const method = "GET";

    return await this.paystackFetch<RequestTotalData>(url, method, {});
  };

  /**
   * @function finalize
   * Finalize a draft payment request
   * @param code - Payment request code
   * @param body
   * @returns {Promise<PaystackResponseInterface<FinalizePaymentRequestData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type FinalizePaymentRequestData
   */
  public finalize = async (
    code: string,
    body: FinalizePaymentRequestBody,
  ): Promise<PaystackResponseInterface<FinalizePaymentRequestData> | null> => {
    const url = this.resourceUrl + "/finalize/:code";
    const method = "POST";

    return await this.paystackFetch<FinalizePaymentRequestData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { code },
    );
  };

  /**
   * @function update
   * Update a payment request's details on your integration
   * @param idOrCode - Payment request `ID` or `code`
   * @param body
   * @returns {Promise<PaystackResponseInterface<UpdatePaymentRequestData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type UpdatePaymentRequestData
   */
  public update = async (
    idOrCode: string,
    body: UpdatePaymentRequestBody,
  ): Promise<PaystackResponseInterface<UpdatePaymentRequestData> | null> => {
    const url = this.resourceUrl + "/:idOrCode";
    const method = "PUT";

    return await this.paystackFetch<UpdatePaymentRequestData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { idOrCode },
    );
  };

  /**
   * @function archive
   * Used to archive a payment request. A payment request will no longer be fetched on list or returned on verify.
   * @param code - Payment request code
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a boolean status property and a message property
   */
  public archive = async (
    code: string,
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/archive/:code";
    const method = "POST";

    return await this.paystackFetch<undefined>(url, method, {}, { code });
  };
}
