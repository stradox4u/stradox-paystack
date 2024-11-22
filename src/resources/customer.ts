import type { CreateCustomerBody, ListCustomerQueries, UpdateCustomerBody, ValidateCustomerBody, WhiteOrBlacklistBody } from "../types/customer.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

/**
 * This class contains methods for working with the Customer resource of the Paystack API
 */
export default class Customer extends PaystackShared {
  private readonly resourceUrl = '/customer';

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Create a customer on your integration
   * @param body 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public create = async (body: CreateCustomerBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function list
   * List customers available on your integration
   * @param queries 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListCustomerQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function fetch
   * Get details of a customer on your integration
   * @param emailOrCode 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetch = async (emailOrCode: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:emailOrCode';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { emailOrCode });
  }

  /**
   * @function update
   * Update a customer's details on your integration
   * @param code 
   * @param body 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public update = async (code: string, body: UpdateCustomerBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:code';
    const method = 'PUT';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>, { code });
  }

  /**
   * @function validate
   * Validate a customer's identity
   * @param code 
   * @param body 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public validate = async (code: string, body: ValidateCustomerBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:code/identification';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>, { code });
  }

  /**
   * @function whiteOrBlacklist
   * Whitelist or blacklist a customer on your integration
   * @param body 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public whiteOrBlacklist = async (body: WhiteOrBlacklistBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/set_risk_action';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function deactivateAuthorization
   * Deactivate an authorization when the card needs to be forgotten
   * @param body 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public deactivateAuthorization = async (body: { authorization_code: string; }): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/deactivate_authorization';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }
}