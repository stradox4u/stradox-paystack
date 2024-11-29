import type { PaystackResponseInterface } from "../types/response.ts";
import type { CreateSubaccountBody, CreateSubaccountData, FetchSubaccountData, ListSubaccountQueries, ListSubaccountsDatum, ListSubaccountsMeta, UpdateSubaccountBody, UpdateSubaccountData } from "../types/subaccount.ts";
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
   * @returns {Promise<PaystackResponseInterface<CreateSubaccountData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type CreateSubaccountData
   */
  public create = async (body: CreateSubaccountBody): Promise<PaystackResponseInterface<CreateSubaccountData> | null> => {
    const url = this.resourceUrl;
    const method = 'POST';

    return await this.paystackFetch<CreateSubaccountData>(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function list
   * List subaccounts available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListSubaccountsDatum[], ListSubaccountsMeta> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListSubaccountsDatum[]
   */
  public list = async (queries: ListSubaccountQueries): Promise<PaystackResponseInterface<ListSubaccountsDatum[], ListSubaccountsMeta> | null> => {
    const url = this.resourceUrl;
    const method = 'GET';

    return await this.paystackFetch<ListSubaccountsDatum[], ListSubaccountsMeta>(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function fetch
   * Get details of a subaccount on your integration
   * @param subaccountCode - The subaccount id or code you want to fetch
   * @returns {Promise<PaystackResponseInterface<FetchSubaccountData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type FetchSubaccountData
   */
  public fetch = async (subaccountCode: string): Promise<PaystackResponseInterface<FetchSubaccountData> | null> => {
    const url = this.resourceUrl + '/:subaccountCode';
    const method = 'GET';

    return await this.paystackFetch<FetchSubaccountData>(url, method, {}, { subaccountCode });
  }

  /**
   * @function update
   * Update a subaccount's details on your integration
   * @param subaccountCode - The subaccount id or code you want to update
   * @param body 
   * @returns {Promise<PaystackResponseInterface<UpdateSubaccountData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type UpdateSubaccountData
   */
  public update = async (subaccountCode: string, body: UpdateSubaccountBody): Promise<PaystackResponseInterface<UpdateSubaccountData> | null> => {
    const url = this.resourceUrl + '/:subaccountCode';
    const method = 'PUT';

    return await this.paystackFetch<UpdateSubaccountData>(url, method, body as unknown as Record<string, unknown>, { subaccountCode });
  }
}