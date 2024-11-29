import type { PaginatedDateRangedList } from "../types/common.ts";
import type {
  BulkCreateRecipientData,
  CreateRecipientBody,
  CreateRecipientData,
  FetchRecipientData,
  ListRecipientsDatum,
  ListRecipientsMeta,
  UpdateRecipientBody,
  UpdateRecipientData,
} from "../types/recipient.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class Recipient extends PaystackShared {
  private readonly resourceUrl = "/transferrecipient";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Creates a new recipient. A duplicate account number will lead to the retrieval of the existing record.
   * @param body
   * @returns {Promise<PaystackResponseInterface<CreateRecipientData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type CreateRecipientData
   */
  public create = async (
    body: CreateRecipientBody,
  ): Promise<PaystackResponseInterface<CreateRecipientData> | null> => {
    const url = this.resourceUrl;
    const method = "POST";

    return await this.paystackFetch<CreateRecipientData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function bulkCreate
   * Create multiple transfer recipients in batches. A duplicate account number will lead to the retrieval
   * of the existing record.
   * @param body
   * @returns {Promise<PaystackResponseInterface<BulkCreateRecipientData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type BulkCreateRecipientData
   */
  public bulkCreate = async (
    body: { batch: CreateRecipientBody[] },
  ): Promise<PaystackResponseInterface<BulkCreateRecipientData> | null> => {
    const url = this.resourceUrl + "/bulk";
    const method = "POST";

    return await this.paystackFetch<BulkCreateRecipientData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function list
   * List transfer recipients available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListRecipientsDatum[], ListRecipientsMeta> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListRecipientsDatum[]
   */
  public list = async (
    queries: PaginatedDateRangedList,
  ): Promise<
    PaystackResponseInterface<ListRecipientsDatum[], ListRecipientsMeta> | null
  > => {
    const url = this.resourceUrl;
    const method = "GET";

    return await this.paystackFetch<ListRecipientsDatum[], ListRecipientsMeta>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function fetch
   * Fetch the details of a transfer recipient
   * @param idOrCode - An ID or code for the recipient whose details you want to receive
   * @returns {Promise<PaystackResponseInterface<FetchRecipientData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type FetchRecipientData
   */
  public fetch = async (
    idOrCode: string,
  ): Promise<PaystackResponseInterface<FetchRecipientData> | null> => {
    const url = this.resourceUrl + "/:idOrCode";
    const method = "GET";

    return await this.paystackFetch<FetchRecipientData>(url, method, {}, {
      idOrCode,
    });
  };

  /**
   * @function update
   * Update the details of a transfer recipient
   * @param idOrCode - Transfer recipient's ID or code
   * @param body
   * @returns {Promise<PaystackResponseInterface<UpdateRecipientData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type UpdateRecipientData
   */
  public update = async (
    idOrCode: string,
    body: UpdateRecipientBody,
  ): Promise<PaystackResponseInterface<UpdateRecipientData> | null> => {
    const url = this.resourceUrl + "/:idOrCode";
    const method = "PUT";

    return await this.paystackFetch<UpdateRecipientData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { idOrCode },
    );
  };

  /**
   * @function delete
   * Delete a transfer recipient (sets the transfer recipient to inactive)
   * @param idOrCode - An ID or code for the recipient you want to delete
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a boolean status property and a message property
   */
  public delete = async (
    idOrCode: string,
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/:idOrCode";
    const method = "DELETE";

    return await this.paystackFetch<undefined>(url, method, {}, { idOrCode });
  };
}
