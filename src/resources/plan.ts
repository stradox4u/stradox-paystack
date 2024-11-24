import type { CreatePlanBody, ListPlanQueries, UpdatePlanBody } from "../types/plan.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class Plan extends PaystackShared {
  private readonly resourceUrl = '/plan';

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Create a plan on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public create = async (body: CreatePlanBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function list
   * List plans available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListPlanQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function fetch
   * Get details of a plan on your integration
   * @param idOrCode - The plan `ID` or `code` you want to fetch
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetch = async (idOrCode: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:idOrCode';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { idOrCode });
  }

  /**
   * @function update
   * Update a plan's details on your integration
   * @param idOrCode - The plan `ID` or `code` you want to update
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public update = async (idOrCode: string, body: UpdatePlanBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:idOrCode';
    const method = 'PUT';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>, { idOrCode });
  }
}