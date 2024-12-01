import type { PaystackResponseInterface } from "../types/response.ts";
import type {
  CreateSubscriptionBody,
  CreateSubscriptionData,
  FetchSubscriptionData,
  GenerateLinkData,
  ListSubscriptionQueries,
  ListSubscriptionsDatum,
  ListSubscriptionsMeta,
  ToggleSubscriptionBody,
} from "../types/subscription.ts";
import PaystackShared from "./paystackShared.ts";

export default class Subscription extends PaystackShared {
  private readonly resourceUrl = "/subscription";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Create a subsciption on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface<CreateSubscriptionData> | null>} response - A promise that resolves to an object with a data property of type CreateSubscriptionBody
   */
  public create = async (
    body: CreateSubscriptionBody,
  ): Promise<PaystackResponseInterface<CreateSubscriptionData> | null> => {
    const url = this.resourceUrl;
    const method = "POST";

    return await this.paystackFetch<CreateSubscriptionData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function list
   * List subscriptions available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListSubscriptionsDatum[], ListSubscriptionsMeta> | null>} response - A promise that resolves to an object with data property of type ListSubscriptionsDatum[] and meta property of type ListSubscriptionsMeta
   */
  public list = async (
    queries: ListSubscriptionQueries,
  ): Promise<
    | PaystackResponseInterface<ListSubscriptionsDatum[], ListSubscriptionsMeta>
    | null
  > => {
    const url = this.resourceUrl;
    const method = "GET";

    return await this.paystackFetch<
      ListSubscriptionsDatum[],
      ListSubscriptionsMeta
    >(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  };

  /**
   * @function fetch
   * Get details of a subscription on your integration
   * @param idOrCode - The subscription `ID` or `code` you want to fetch
   * @returns {Promise<PaystackResponseInterface<FetchSubscriptionData> | null>} response - A promise that resolves to an object with a data property of type FetchSubscriptionData
   */
  public fetch = async (
    idOrCode: string,
  ): Promise<PaystackResponseInterface<FetchSubscriptionData> | null> => {
    const url = this.resourceUrl + "/:idOrCode";
    const method = "GET";

    return await this.paystackFetch<FetchSubscriptionData>(url, method, {}, {
      idOrCode,
    });
  };

  /**
   * @function enable
   * Enable a subscription on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to an object with a boolean status property and a message property
   */
  public enable = async (
    body: ToggleSubscriptionBody,
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/enable";
    const method = "POST";

    return await this.paystackFetch<undefined>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function disable
   * Disable a subscription on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to an object with a boolean status property and a message property
   */
  public disable = async (
    body: ToggleSubscriptionBody,
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/disable";
    const method = "POST";

    return await this.paystackFetch<undefined>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function generateLink
   * Generate a link for updating the card on a subscription
   * @param code - The subscription code
   * @returns {Promise<PaystackResponseInterface<GenerateLinkData> | null>} response - A promise that resolves to an object with a data property of type GenerateLinkData
   */
  public generateLink = async (
    code: string,
  ): Promise<PaystackResponseInterface<GenerateLinkData> | null> => {
    const url = this.resourceUrl + "/:code/manage/link";
    const method = "GET";

    return await this.paystackFetch<GenerateLinkData>(url, method, {}, {
      code,
    });
  };

  /**
   * @function sendLink
   * Email a customer a link for updating the card on their subscription
   * @param code - The subscription code
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to an object with a boolean status property and a message property
   */
  public sendLink = async (
    code: string,
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/:code/manage/email";
    const method = "POST";

    return await this.paystackFetch<undefined>(url, method, {}, { code });
  };
}
