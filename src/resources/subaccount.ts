import type { PaystackResponseInterface } from "../types/response.ts";
import type { CreateSubaccountBody, ListSubaccountQueries, UpdateSubaccountBody } from "../types/subaccount.ts";
import PaystackShared from "./paystackShared.ts";

export default class Subaccount extends PaystackShared {
  private readonly resourceUrl = '/subaccount';

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Create a subaccount on your integration
   * @param body 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public create = async (body: CreateSubaccountBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function list
   * List subaccounts available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListSubaccountQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function fetch
   * Get details of a subaccount on your integration
   * @param subaccountCode - The subaccount id or code you want to fetch
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetch = async (subaccountCode: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:subaccountCode';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { subaccountCode });
  }

  /**
   * @function update
   * Update a subaccount's details on your integration
   * @param subaccountCode - The subaccount id or code you want to update
   * @param body 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public update = async (subaccountCode: string, body: UpdateSubaccountBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:subaccountCode';
    const method = 'PUT';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>, { subaccountCode });
  }
}