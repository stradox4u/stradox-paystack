import type { PaystackResponseInterface } from "../types/response.ts";
import type { AssignVirtualAccountBody, CreateVirtualAccountBody, ListVirtualAccountQueries, RequeryVirtualAccountQueries, SplitVirtualAccountTransactionBody } from "../types/virtualAccounts.ts";
import PaystackShared from "./paystackShared.ts";

export default class DedicatedVirtualAccount {
  private readonly rootUrl = '/dedicated_account';
  private readonly tools: PaystackShared;

  constructor(secretKey: string) {
    this.tools = PaystackShared.getInstance(secretKey);
  }

  /**
   * @function create
   * Create a dedicated virtual account for an existing customer
   * @param body 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public create = async (body: CreateVirtualAccountBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl;
    const method = 'POST';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function assign
   * Create a customer, validate the customer and assign a DVA to the customer
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public assign = async (body: AssignVirtualAccountBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/assign';
    const method = 'POST';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function list
   * List dedicated virtual accounts available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListVirtualAccountQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl;
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function fetch
   * Get details of a dedicated virtual account on your integration
   * @param accountId
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetch = async (accountId: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:accountId';
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {}, { accountId });
  }

  /**
   * @function requery
   * Requery dedicated virtual account for new transactions
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public requery = async (queries: RequeryVirtualAccountQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/requery';
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function deactivate
   * Deactivate a dedicated virtual account on your integration
   * @param accountId
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public deactivate = async (accountId: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:accountId';
    const method = 'DELETE';

    return await this.tools.paystackFetch(url, method, {}, { accountId });
  }

  /**
   * @function split
   * Split a dedicated virtual account transaction with one or more accounts
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public split = async (body: SplitVirtualAccountTransactionBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/split';
    const method = 'POST';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function removeSplit
   * If you've previously set up split payment for transactions on a dedicated
   * virtual account, you can remove it with this method
   * @param body - The dedicated virtual account number
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public removeSplit = async (body: { account_number: string }): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/split';
    const method = 'DELETE';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function fetchProviders
   * Get available bank providers for a dedicated virtual account
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetchProviders = async (): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/available_providers';
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {});
  }
}