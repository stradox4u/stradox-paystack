import type { CreateProductBody, ListProductQueries } from "../types/product.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class Product extends PaystackShared {
  private readonly resourceUrl = '/product';

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Create a product on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public create = async (body: CreateProductBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function list
   * List products available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListProductQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function fetch
   * Get the details of a product on your integration
   * @param id - The product ID you want to fetch
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetch = async (id: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:id';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { id });
  }

  /**
   * @function update
   * Update a product's details on your integration
   * @param id - The product ID you want to update
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public update = async (id: string, body: CreateProductBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:id';
    const method = 'PUT';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>, { id });
  }
}