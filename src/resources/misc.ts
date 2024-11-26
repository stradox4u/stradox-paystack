import type { ListBanksQueries, ListStatesQueries, PaystackBank, PaystackCountry, PaystackState } from "../types/misc.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class Misc extends PaystackShared {
  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function listBanks
   * Get a list of all supported banks and their properties
   * @param queries
   * @returns {Promise<PaystackResponseInterface<PaystackBank[]> | null>}
   */
  public listBanks = async (queries: ListBanksQueries): Promise<PaystackResponseInterface<PaystackBank[]> | null> => {
    const url = '/bank';
    const method = 'GET';

    return await this.paystackFetch<PaystackBank[]>(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function listCountries
   * Get a list of countries that Paystack currently supports
   * @returns {Promise<PaystackResponseInterface<PaystackCountry[]> | null>}
   */
  public listCountries = async (): Promise<PaystackResponseInterface<PaystackCountry[]> | null> => {
    const url = '/country';
    const method = 'GET';

    return await this.paystackFetch<PaystackCountry[]>(url, method, {});
  }

  /**
   * @function listStates
   * Get a list of states for a country for address verification
   * @param queries
   * @returns {Promise<PaystackResponseInterface<PaystackState[]> | null>}
   */
  public listStates = async (queries: ListStatesQueries): Promise<PaystackResponseInterface<PaystackState[]> | null> => {
    const url = '/address_verification/states';
    const method = 'GET';

    return await this.paystackFetch<PaystackState[]>(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }
}