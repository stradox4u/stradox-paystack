import { ListApplePayDomainsQueries } from "../types/applePay.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class ApplePay {
  private readonly rootUrl = '/apple-pay';
  private readonly tools: PaystackShared;

  constructor(secretKey: string) {
    this.tools = PaystackShared.getInstance(secretKey);
  }

  /**
   * @function register
   * Register a top-level domain or subdomain for your Apple Pay integration
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public register = async (body: { domainName: string; displayName: string }): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/domain';
    const method = 'POST';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function list
   * List all registered domains on your integration. Returns an empty array if no domains have been added.
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListApplePayDomainsQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/domain';
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function unregister
   * Unregister a top-level domain or subdomain previously used for your Apple Pay integration
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public unregister = async (body: { domainName: string }): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/domain';
    const method = 'DELETE';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }
}