import type {
  ListApplePayDomainsQueries,
  ListDomainsData,
} from "../types/applePay.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class ApplePay extends PaystackShared {
  private readonly resourceUrl = "/apple-pay";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function register
   * Register a top-level domain or subdomain for your Apple Pay integration
   * @param body
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} status - A promise that resolves to an object containing success and a message
   */
  public register = async (
    body: { domainName: string; displayName: string },
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/domain";
    const method = "POST";

    return await this.paystackFetch<undefined>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function list
   * List all registered domains on your integration. Returns an empty array if no domains have been added.
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListDomainsData> | null>} response - A promise that resolves to a PaystackResponseInterface type, with the data property being of type ListDomainsData
   */
  public list = async (
    queries: ListApplePayDomainsQueries,
  ): Promise<PaystackResponseInterface<ListDomainsData> | null> => {
    const url = this.resourceUrl + "/domain";
    const method = "GET";

    return await this.paystackFetch<ListDomainsData>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function unregister
   * Unregister a top-level domain or subdomain previously used for your Apple Pay integration
   * @param body
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} status - A promise that resolves to an object containing success and a message
   */
  public unregister = async (
    body: { domainName: string },
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/domain";
    const method = "DELETE";

    return await this.paystackFetch<undefined>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };
}
