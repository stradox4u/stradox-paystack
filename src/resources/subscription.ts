import type { PaystackResponseInterface } from "../types/response.ts";
import type { CreateSubscriptionBody, ListSubscriptionQueries, ToggleSubscriptionBody } from "../types/subscription.ts";
import PaystackShared from "./paystackShared.ts";

export default class Subscription extends PaystackShared {
  private readonly resourceUrl = '/subscription';

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Create a subsciption on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public create = async (body: CreateSubscriptionBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function list
   * List subscriptions available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListSubscriptionQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function fetch
   * Get details of a subscription on your integration
   * @param idOrCode - The subscription `ID` or `code` you want to fetch
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetch = async (idOrCode: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:idOrCode';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { idOrCode });
  }

  /**
   * @function enable
   * Enable a subscription on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public enable = async (body: ToggleSubscriptionBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/enable';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function disable
   * Disable a subscription on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public disable = async (body: ToggleSubscriptionBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/disable';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function generateLink
   * Generate a link for updating the card on a subscription
   * @param code - The subscription code
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public generateLink = async (code: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:code/manage/link';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { code });
  }

  /**
   * @function sendLink
   * Email a customer a link for updating the card on their subscription
   * @param code - The subscription code
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public sendLink = async (code: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:code/manage/email';
    const method = 'POST';

    return await this.paystackFetch(url, method, {}, { code });
  }
}