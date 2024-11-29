import type { PaystackResponseInterface } from "../types/response.ts";
import type { AssignVirtualAccountBody, CreateVirtualAccountBody, CreateVirtualAccountData, DeactivateVirtualAccountData, FetchProvidersDatum, FetchVirtualAccountData, ListVirtualAccountQueries, ListVirtualAccountsDatum, ListVirtualAccountsMeta, RemoveSplitData, RequeryVirtualAccountQueries, SplitTransactionData, SplitVirtualAccountTransactionBody } from "../types/virtualAccounts.ts";
import PaystackShared from "./paystackShared.ts";

export default class DedicatedVirtualAccount extends PaystackShared {
  private readonly resourceUrl = '/dedicated_account';

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Create a dedicated virtual account for an existing customer
   * @param body 
   * @returns {Promise<PaystackResponseInterface<CreateVirtualAccountData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a data property of type CreateVirtualAccountData
   */
  public create = async (body: CreateVirtualAccountBody): Promise<PaystackResponseInterface<CreateVirtualAccountData> | null> => {
    const url = this.resourceUrl;
    const method = 'POST';

    return await this.paystackFetch<CreateVirtualAccountData>(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function assign
   * Create a customer, validate the customer and assign a DVA to the customer
   * @param body
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a boolean status property and a message property
   */
  public assign = async (body: AssignVirtualAccountBody): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + '/assign';
    const method = 'POST';

    return await this.paystackFetch<undefined>(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function list
   * List dedicated virtual accounts available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListVirtualAccountsDatum[], ListVirtualAccountsMeta> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a data property of type ListVirtualAccountsDatum[] and a meta property of type ListVirtualAccountsMeta
   */
  public list = async (queries: ListVirtualAccountQueries): Promise<PaystackResponseInterface<ListVirtualAccountsDatum[], ListVirtualAccountsMeta> | null> => {
    const url = this.resourceUrl;
    const method = 'GET';

    return await this.paystackFetch<ListVirtualAccountsDatum[], ListVirtualAccountsMeta>(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function fetch
   * Get details of a dedicated virtual account on your integration
   * @param accountId
   * @returns {Promise<PaystackResponseInterface<FetchVirtualAccountData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a data property of type FetchVirtualAccountData
   */
  public fetch = async (accountId: string): Promise<PaystackResponseInterface<FetchVirtualAccountData> | null> => {
    const url = this.resourceUrl + '/:accountId';
    const method = 'GET';

    return await this.paystackFetch<FetchVirtualAccountData>(url, method, {}, { accountId });
  }

  /**
   * @function requery
   * Requery dedicated virtual account for new transactions
   * @param queries
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a boolean status property and a message property
   */
  public requery = async (queries: RequeryVirtualAccountQueries): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + '/requery';
    const method = 'GET';

    return await this.paystackFetch<undefined>(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function deactivate
   * Deactivate a dedicated virtual account on your integration
   * @param accountId
   * @returns {Promise<PaystackResponseInterface<DeactivateVirtualAccountData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a data property of type DeactivateVirtualAccountData
   */
  public deactivate = async (accountId: string): Promise<PaystackResponseInterface<DeactivateVirtualAccountData> | null> => {
    const url = this.resourceUrl + '/:accountId';
    const method = 'DELETE';

    return await this.paystackFetch<DeactivateVirtualAccountData>(url, method, {}, { accountId });
  }

  /**
   * @function split
   * Split a dedicated virtual account transaction with one or more accounts
   * @param body
   * @returns {Promise<PaystackResponseInterface<SplitTransactionData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a data property of type SplitTransactionData
   */
  public split = async (body: SplitVirtualAccountTransactionBody): Promise<PaystackResponseInterface<SplitTransactionData> | null> => {
    const url = this.resourceUrl + '/split';
    const method = 'POST';

    return await this.paystackFetch<SplitTransactionData>(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function removeSplit
   * If you've previously set up split payment for transactions on a dedicated
   * virtual account, you can remove it with this method
   * @param body - The dedicated virtual account number
   * @returns {Promise<PaystackResponseInterface<RemoveSplitData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a data property of type RemoveSplitData
   */
  public removeSplit = async (body: { account_number: string }): Promise<PaystackResponseInterface<RemoveSplitData> | null> => {
    const url = this.resourceUrl + '/split';
    const method = 'DELETE';

    return await this.paystackFetch<RemoveSplitData>(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function fetchProviders
   * Get available bank providers for a dedicated virtual account
   * @returns {Promise<PaystackResponseInterface<FetchProvidersDatum[]> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a data property of type FetchProvidersDatum[]
   */
  public fetchProviders = async (): Promise<PaystackResponseInterface<FetchProvidersDatum[]> | null> => {
    const url = this.resourceUrl + '/available_providers';
    const method = 'GET';

    return await this.paystackFetch<FetchProvidersDatum[]>(url, method, {});
  }
}