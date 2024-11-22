import type { PaystackResponseInterface } from "../types/response.ts";
import type { CreateSubaccountBody, ListSubaccountQueries, UpdateSubaccountBody } from "../types/subaccount.ts";
import PaystackShared from "./paystackShared.ts";

export default class Subaccount {
  private readonly rootUrl = '/subaccount';
  private readonly tools: PaystackShared;

  constructor(secretKey: string) {
    this.tools = PaystackShared.getInstance(secretKey);
  }

  /**
   * @function create
   * Create a subaccount on your integration
   * @param body 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public create = async (body: CreateSubaccountBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl;
    const method = 'POST';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function list
   * List subaccounts available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListSubaccountQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl;
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function fetch
   * Get details of a subaccount on your integration
   * @param subaccountCode - The subaccount id or code you want to fetch
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetch = async (subaccountCode: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:subaccountCode';
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {}, { subaccountCode });
  }

  /**
   * @function update
   * Update a subaccount's details on your integration
   * @param subaccountCode - The subaccount id or code you want to update
   * @param body 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public update = async (subaccountCode: string, body: UpdateSubaccountBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:subaccountCode';
    const method = 'PUT';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>, { subaccountCode });
  }
}