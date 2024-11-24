import type { PaystackResponseInterface } from "../types/response.ts";
import type { ListSettlementQueries, ListSettlementTransactionsQueries } from "../types/settlement.ts";
import PaystackShared from "./paystackShared.ts";

export default class Settlement extends PaystackShared {
  private readonly resourceUrl = '/settlement';

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function list
   * List settlements made to your settlement accounts
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListSettlementQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function listTransactions
   * Get the transaction that make up a particular settlement
   * @param id - The settlement ID for which you want to fetch its transactions
   * @param queries
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public listTransactions = async (id: string, queries: ListSettlementTransactionsQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:id/transactions';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { id }, queries as unknown as Record<string, unknown>);
  }
}