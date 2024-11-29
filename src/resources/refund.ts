import type {
  CreateRefundBody,
  CreateRefundData,
  ListRefundDatum,
  ListRefundQueries,
} from "../types/refund.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class Refund extends PaystackShared {
  private readonly resourceUrl = "/refund";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Intiate a refund on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface<CreateRefundData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type CreateRefundData
   */
  public create = async (
    body: CreateRefundBody,
  ): Promise<PaystackResponseInterface<CreateRefundData> | null> => {
    const url = this.resourceUrl;
    const method = "POST";

    return await this.paystackFetch<CreateRefundData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function list
   * List refunds available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListRefundDatum[]> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListRefundDatum[]
   */
  public list = async (
    queries: ListRefundQueries,
  ): Promise<PaystackResponseInterface<ListRefundDatum[]> | null> => {
    const url = this.resourceUrl;
    const method = "GET";

    return await this.paystackFetch<ListRefundDatum[]>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function fetch
   * Get the details of a refund on your integration
   * @param refundId - the ID of the initiated refund
   * @returns {Promise<PaystackResponseInterface<ListRefundDatum> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListRefundDatum
   */
  public fetch = async (
    refundId: string,
  ): Promise<PaystackResponseInterface<ListRefundDatum> | null> => {
    const url = this.resourceUrl + "/:refundId";
    const method = "GET";

    return await this.paystackFetch<ListRefundDatum>(url, method, {}, {
      refundId,
    });
  };
}
