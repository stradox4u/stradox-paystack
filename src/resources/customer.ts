import type {
  CreateCustomerBody,
  CreateCustomerData,
  FetchCustomerData,
  ListCustomerData,
  ListCustomerMeta,
  ListCustomerQueries,
  UpdateCustomerBody,
  UpdateCustomerData,
  ValidateCustomerBody,
  WhiteOrBlacklistBody,
  WhiteOrBlacklistData,
} from "../types/customer.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

/**
 * This class contains methods for working with the Customer resource of the Paystack API
 */
export default class Customer extends PaystackShared {
  private readonly resourceUrl = "/customer";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Create a customer on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface<CreateCustomerData> | null>} response - A promise that resolves to an object with the created customer details
   */
  public create = async (
    body: CreateCustomerBody,
  ): Promise<PaystackResponseInterface<CreateCustomerData> | null> => {
    const url = this.resourceUrl;
    const method = "POST";

    return await this.paystackFetch<CreateCustomerData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function list
   * List customers available on your integration
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListCustomerData[], ListCustomerMeta> | null>} response - A promise that resolves to an object containing an array of customer objects
   */
  public list = async (
    queries: ListCustomerQueries,
  ): Promise<PaystackResponseInterface<ListCustomerData[], ListCustomerMeta> | null> => {
    const url = this.resourceUrl;
    const method = "GET";

    return await this.paystackFetch<ListCustomerData[], ListCustomerMeta>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function fetch
   * Get details of a customer on your integration
   * @param emailOrCode
   * @returns {Promise<PaystackResponseInterface<FetchCustomerData> | null>} response - A promise that resolves to an object with the customer details
   */
  public fetch = async (
    emailOrCode: string,
  ): Promise<PaystackResponseInterface<FetchCustomerData> | null> => {
    const url = this.resourceUrl + "/:emailOrCode";
    const method = "GET";

    return await this.paystackFetch<FetchCustomerData>(url, method, {}, {
      emailOrCode,
    });
  };

  /**
   * @function update
   * Update a customer's details on your integration
   * @param code
   * @param body
   * @returns {Promise<PaystackResponseInterface<UpdateCustomerData> | null>} response - A promise that resolves to an object with the updated customer details
   */
  public update = async (
    code: string,
    body: UpdateCustomerBody,
  ): Promise<PaystackResponseInterface<UpdateCustomerData> | null> => {
    const url = this.resourceUrl + "/:code";
    const method = "PUT";

    return await this.paystackFetch<UpdateCustomerData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { code },
    );
  };

  /**
   * @function validate
   * Validate a customer's identity
   * @param code
   * @param body
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to an object with the request status and a message.
   */
  public validate = async (
    code: string,
    body: ValidateCustomerBody,
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/:code/identification";
    const method = "POST";

    return await this.paystackFetch<undefined>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { code },
    );
  };

  /**
   * @function whiteOrBlacklist
   * Whitelist or blacklist a customer on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface<WhiteOrBlacklistData> | null>} response - A promise that resolves to an object with the customer's risk action
   */
  public whiteOrBlacklist = async (
    body: WhiteOrBlacklistBody,
  ): Promise<PaystackResponseInterface<WhiteOrBlacklistData> | null> => {
    const url = this.resourceUrl + "/set_risk_action";
    const method = "POST";

    return await this.paystackFetch<WhiteOrBlacklistData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function deactivateAuthorization
   * Deactivate an authorization when the card needs to be forgotten
   * @param body
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to an object with the request status and a message.
   */
  public deactivateAuthorization = async (
    body: { authorization_code: string },
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/deactivate_authorization";
    const method = "POST";

    return await this.paystackFetch<undefined>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };
}
