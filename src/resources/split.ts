import type { PaystackResponseInterface } from "../types/response.ts";
import type {
  AddSubaccountSplitBody,
  AddSubaccountSplitData,
  CreateSplitBody,
  CreateSplitData,
  FetchSplitData,
  ListSplitQueries,
  ListSplitsDatum,
  ListSplitsMeta,
  UpdateSplitBody,
  UpdateSplitData,
} from "../types/split.ts";
import PaystackShared from "./paystackShared.ts";

/**
 * This class contains methods for working with the Split resource of the Paystack API
 */
export default class Split extends PaystackShared {
  private readonly resourceUrl = "/split";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * @param {CreateSplitBody} body
   * @returns {Promise<PaystackResponseInterface<CreateSplitData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type CreateSplitData
   */
  public create = async (
    body: CreateSplitBody,
  ): Promise<PaystackResponseInterface<CreateSplitData> | null> => {
    const url = this.resourceUrl;
    const method = "POST";

    return await this.paystackFetch<CreateSplitData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function list
   * @param {ListSplitQueries} queries
   * @returns {Promise<PaystackResponseInterface<ListSplitsDatum[], ListSplitsMeta> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListSplitsDatum[]
   */
  public list = async (
    queries: ListSplitQueries,
  ): Promise<
    PaystackResponseInterface<ListSplitsDatum[], ListSplitsMeta> | null
  > => {
    const url = this.resourceUrl;
    const method = "GET";

    return await this.paystackFetch<ListSplitsDatum[], ListSplitsMeta>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function fetch
   * @param {string} splitId
   * @returns {Promise<PaystackResponseInterface<FetchSplitData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type FetchSplitData
   */
  public fetch = async (
    splitId: string,
  ): Promise<PaystackResponseInterface<FetchSplitData> | null> => {
    const url = this.resourceUrl + "/:splitId";
    const method = "GET";

    return await this.paystackFetch<FetchSplitData>(url, method, {}, {
      splitId,
    });
  };

  /**
   * @function update
   * @param {string} splitId
   * @param {UpdateSplitBody} body
   * @returns {Promise<PaystackResponseInterface<UpdateSplitData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type UpdateSplitData
   */
  public update = async (
    splitId: string,
    body: UpdateSplitBody,
  ): Promise<PaystackResponseInterface<UpdateSplitData> | null> => {
    const url = this.resourceUrl + "/:splitId";
    const method = "PUT";

    return await this.paystackFetch<UpdateSplitData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { splitId },
    );
  };

  /**
   * @function addSubaccountSplit
   * @param {string} splitId
   * @param {AddSubaccountSplitBody} body
   * @returns {Promise<PaystackResponseInterface<AddSubaccountSplitData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type AddSubaccountSplitData
   */
  public addSubaccountSplit = async (
    splitId: string,
    body: AddSubaccountSplitBody,
  ): Promise<PaystackResponseInterface<AddSubaccountSplitData> | null> => {
    const url = this.resourceUrl + "/:splitId/subaccount/add";
    const method = "POST";

    return await this.paystackFetch<AddSubaccountSplitData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { splitId },
    );
  };

  /**
   * @function removeSubaccountSplit
   * @param {string} splitId
   * @param {Record<string, string>} body
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a boolean status property and a message property
   */
  public removeSubaccountSplit = async (
    splitId: string,
    body: { subaccount: string },
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/:splitId/subaccount/remove";
    const method = "POST";

    return await this.paystackFetch<undefined>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { splitId },
    );
  };
}
