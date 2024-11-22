import type { PaystackResponseInterface } from "../types/response.ts";
import type { AddSubaccountSplitBody, CreateSplitBody, ListSplitQueries, UpdateSplitBody } from "../types/split.ts";
import PaystackShared from "./paystackShared.ts";

/**
 * This class contains methods for working with the Split resource of the Paystack API
 */
export default class Split extends PaystackShared {
  private readonly resourceUrl = '/split';

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * @param {CreateSplitBody} body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public create = async (body: CreateSplitBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'POST';
  
    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function list
   * @param {ListSplitQueries} queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListSplitQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function fetch
   * @param {string} splitId
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetch = async (splitId: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:splitId';
    const method = 'GET';
  
    return await this.paystackFetch(url, method, {}, { splitId });
  }

  /**
   * @function update
   * @param {string} splitId
   * @param {UpdateSplitBody} body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public update = async (splitId: string, body: UpdateSplitBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:splitId';
    const method = 'PUT';
  
    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>, { splitId });
  }

  /**
   * @function addSubaccountSplit
   * @param {string} splitId
   * @param {AddSubaccountSplitBody} body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public addSubaccountSplit = async (splitId: string, body: AddSubaccountSplitBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:splitId/subaccount/add';
    const method = 'POST';
  
    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>, { splitId });
  }

  /**
   * @function removeSubaccountSplit
   * @param {string} splitId
   * @param {Record<string, string>} body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public removeSubaccountSplit = async(splitId: string, body: { subaccount: string }): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:splitId/subaccount/remove';
    const method = 'POST';
  
    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>, { splitId });
  }
}