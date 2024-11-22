import type { CreateCustomerBody, ListCustomerQueries, UpdateCustomerBody, ValidateCustomerBody, WhiteOrBlacklistBody } from "../types/customer.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

/**
 * This class contains methods for working with the Customer resource of the Paystack API
 */
export default class Customer {
  private readonly rootUrl = '/customer';
  private readonly tools: PaystackShared;

  constructor(secretKey: string) {
    this.tools = PaystackShared.getInstance(secretKey);
  }

  public create = async (body: CreateCustomerBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl;
    const method = 'POST';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  public list = async (queries: ListCustomerQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl;
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  public fetch = async (emailOrCode: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:emailOrCode';
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {}, { emailOrCode });
  }

  public update = async (code: string, body: UpdateCustomerBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:code';
    const method = 'PUT';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>, { code });
  }

  public validate = async (code: string, body: ValidateCustomerBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:code/identification';
    const method = 'POST';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>, { code });
  }

  public whiteOrBlacklist = async (body: WhiteOrBlacklistBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/set_risk_action';
    const method = 'POST';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  public deactivateAuthorization = async (body: { authorization_code: string; }): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/deactivate_authorization';
    const method = 'POST';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }
}