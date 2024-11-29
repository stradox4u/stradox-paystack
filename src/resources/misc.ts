import type {
ListBanksDatum,
ListBanksMeta,
  ListBanksQueries,
  ListCountriesDatum,
  ListStatesDatum,
  ListStatesQueries,
} from "../types/misc.ts";
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
   * @returns {Promise<PaystackResponseInterface<ListBanksDatum[], ListBanksMeta> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListBanksDatum[]
   */
  public listBanks = async (
    queries: ListBanksQueries,
  ): Promise<PaystackResponseInterface<ListBanksDatum[], ListBanksMeta> | null> => {
    const url = "/bank";
    const method = "GET";

    return await this.paystackFetch<ListBanksDatum[], ListBanksMeta>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function listCountries
   * Get a list of countries that Paystack currently supports
   * @returns {Promise<PaystackResponseInterface<ListCountriesDatum[]> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListCountriesDatum[]
   */
  public listCountries = async (): Promise<
    PaystackResponseInterface<ListCountriesDatum[]> | null
  > => {
    const url = "/country";
    const method = "GET";

    return await this.paystackFetch<ListCountriesDatum[]>(url, method, {});
  };

  /**
   * @function listStates
   * Get a list of states for a country for address verification
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListStatesDatum[]> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListStatesDatum[]
   */
  public listStates = async (
    queries: ListStatesQueries,
  ): Promise<PaystackResponseInterface<ListStatesDatum[]> | null> => {
    const url = "/address_verification/states";
    const method = "GET";

    return await this.paystackFetch<ListStatesDatum[]>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };
}
