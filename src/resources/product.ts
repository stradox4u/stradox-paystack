import type {
  CreateProductBody,
  CreateProductData,
  FetchProductData,
  ListProductQueries,
  ListProductsDatum,
  ListProductsMeta,
  UpdateProductData,
} from "../types/product.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class Product extends PaystackShared {
  private readonly resourceUrl = "/product";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Create a product on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface<CreateProductData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type CreateProductData
   */
  public create = async (
    body: CreateProductBody,
  ): Promise<PaystackResponseInterface<CreateProductData> | null> => {
    const url = this.resourceUrl;
    const method = "POST";

    return await this.paystackFetch<CreateProductData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function list
   * List products available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListProductsDatum[], ListProductsMeta> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListProductsDatum[]
   */
  public list = async (
    queries: ListProductQueries,
  ): Promise<
    PaystackResponseInterface<ListProductsDatum[], ListProductsMeta> | null
  > => {
    const url = this.resourceUrl;
    const method = "GET";

    return await this.paystackFetch<ListProductsDatum[], ListProductsMeta>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function fetch
   * Get the details of a product on your integration
   * @param id - The product ID you want to fetch
   * @returns {Promise<PaystackResponseInterface<FetchProductData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type FetchProductData
   */
  public fetch = async (
    id: string,
  ): Promise<PaystackResponseInterface<FetchProductData> | null> => {
    const url = this.resourceUrl + "/:id";
    const method = "GET";

    return await this.paystackFetch<FetchProductData>(url, method, {}, { id });
  };

  /**
   * @function update
   * Update a product's details on your integration
   * @param id - The product ID you want to update
   * @param body
   * @returns {Promise<PaystackResponseInterface<UpdateProductData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type UpdateProductData
   */
  public update = async (
    id: string,
    body: CreateProductBody,
  ): Promise<PaystackResponseInterface<UpdateProductData> | null> => {
    const url = this.resourceUrl + "/:id";
    const method = "PUT";

    return await this.paystackFetch<UpdateProductData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { id },
    );
  };
}
