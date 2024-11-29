import type {
  CreatePlanBody,
  CreatePlanData,
  ListPlanQueries,
  ListPlansDatum,
  ListPlansMeta,
  UpdatePlanBody,
} from "../types/plan.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class Plan extends PaystackShared {
  private readonly resourceUrl = "/plan";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Create a plan on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface<CreatePlanData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type CreatePlanData
   */
  public create = async (
    body: CreatePlanBody,
  ): Promise<PaystackResponseInterface<CreatePlanData> | null> => {
    const url = this.resourceUrl;
    const method = "POST";

    return await this.paystackFetch<CreatePlanData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function list
   * List plans available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListPlansDatum[], ListPlansMeta> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListPlansDatum[]
   */
  public list = async (
    queries: ListPlanQueries,
  ): Promise<
    PaystackResponseInterface<ListPlansDatum[], ListPlansMeta> | null
  > => {
    const url = this.resourceUrl;
    const method = "GET";

    return await this.paystackFetch<ListPlansDatum[], ListPlansMeta>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function fetch
   * Get details of a plan on your integration
   * @param idOrCode - The plan `ID` or `code` you want to fetch
   * @returns {Promise<PaystackResponseInterface<ListPlansDatum> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListPlansDatum
   */
  public fetch = async (
    idOrCode: string,
  ): Promise<PaystackResponseInterface<ListPlansDatum> | null> => {
    const url = this.resourceUrl + "/:idOrCode";
    const method = "GET";

    return await this.paystackFetch<ListPlansDatum>(url, method, {}, {
      idOrCode,
    });
  };

  /**
   * @function update
   * Update a plan's details on your integration
   * @param idOrCode - The plan `ID` or `code` you want to update
   * @param body
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a boolean status property and a message property
   */
  public update = async (
    idOrCode: string,
    body: UpdatePlanBody,
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/:idOrCode";
    const method = "PUT";

    return await this.paystackFetch<undefined>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { idOrCode },
    );
  };
}
