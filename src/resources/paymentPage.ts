import type {
  AddProductBody,
  AddProductsData,
  CreatePaymentPageBody,
  CreatePaymentPageData,
  FetchPaymentPageData,
  ListPaymentPageDatum,
  ListPaymentPageMeta,
  ListPaymentPageQueries,
  UpdatePaymentPageBody,
  UpdatePaymentPageData,
} from "../types/paymentPage.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class PaymentPage extends PaystackShared {
  private readonly resourceUrl = "/page";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Create a payment page on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface<CreatePaymentPageData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type CreatePaymentPageData
   */
  public create = async (
    body: CreatePaymentPageBody,
  ): Promise<PaystackResponseInterface<CreatePaymentPageData> | null> => {
    const url = this.resourceUrl;
    const method = "POST";

    return await this.paystackFetch<CreatePaymentPageData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function list
   * List payment pages available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListPaymentPageDatum[], ListPaymentPageMeta> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListPaymentPageDatum[]
   */
  public list = async (
    queries: ListPaymentPageQueries,
  ): Promise<
    | PaystackResponseInterface<ListPaymentPageDatum[], ListPaymentPageMeta>
    | null
  > => {
    const url = this.resourceUrl;
    const method = "GET";

    return await this.paystackFetch<
      ListPaymentPageDatum[],
      ListPaymentPageMeta
    >(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  };

  /**
   * @function fetch
   * Get the details of a payment page on your integration
   * @param idOrSlug - The payment page ID or slug you want to fetch
   * @returns {Promise<PaystackResponseInterface<FetchPaymentPageData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type FetchPaymentPageData
   */
  public fetch = async (
    idOrSlug: string,
  ): Promise<PaystackResponseInterface<FetchPaymentPageData> | null> => {
    const url = this.resourceUrl + "/:idOrSlug";
    const method = "GET";

    return await this.paystackFetch<FetchPaymentPageData>(url, method, {}, {
      idOrSlug,
    });
  };

  /**
   * @function update
   * Update a payment page's details on your integration
   * @param idOrSlug - The payment page ID or slug you want to update
   * @param body
   * @returns {Promise<PaystackResponseInterface<UpdatePaymentPageData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type UpdatePaymentPageData
   */
  public update = async (
    idOrSlug: string,
    body: UpdatePaymentPageBody,
  ): Promise<PaystackResponseInterface<UpdatePaymentPageData> | null> => {
    const url = this.resourceUrl + "/:idOrSlug";
    const method = "PUT";

    return await this.paystackFetch<UpdatePaymentPageData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { idOrSlug },
    );
  };

  /**
   * @function checkSlugAvailability
   * Check the availability of a slug for a payment page
   * @param slug - URL slug to be confirmed
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a boolean status and a message
   */
  public checkSlugAvailability = async (
    slug: string,
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/check_slug_availability/:slug";
    const method = "GET";

    return await this.paystackFetch<undefined>(url, method, {}, { slug });
  };

  /**
   * @functon addProducts
   * Add products to a payment page
   * @param id - The ID of the payment page
   * @param body
   * @returns {Promise<PaystackResponseInterface<AddProductsData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type AddProductsData
   */
  public addProducts = async (
    id: string,
    body: AddProductBody,
  ): Promise<PaystackResponseInterface<AddProductsData> | null> => {
    const url = this.resourceUrl + "/:id/product";
    const method = "POST";

    return await this.paystackFetch<AddProductsData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { id },
    );
  };
}
