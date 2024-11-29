import type { PaystackResponseInterface } from "../types/response.ts";
import type {
  ListSettlementQueries,
  ListSettlementsDatum,
  ListSettlementTransactionsDatum,
  ListSettlementTransactionsQueries,
  SettlementListMeta,
} from "../types/settlement.ts";
import PaystackShared from "./paystackShared.ts";

export default class Settlement extends PaystackShared {
  private readonly resourceUrl = "/settlement";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function list
   * List settlements made to your settlement accounts
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListSettlementsDatum[], SettlementListMeta> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListSettlementsDatum[]
   */
  public list = async (
    queries: ListSettlementQueries,
  ): Promise<
    PaystackResponseInterface<ListSettlementsDatum[], SettlementListMeta> | null
  > => {
    const url = this.resourceUrl;
    const method = "GET";

    return await this.paystackFetch<ListSettlementsDatum[], SettlementListMeta>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function listTransactions
   * Get the transaction that make up a particular settlement
   * @param id - The settlement ID for which you want to fetch its transactions
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ListSettlementTransactionsDatum[], SettlementListMeta> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListSettlementTransactionsDatum[]
   */
  public listTransactions = async (
    id: string,
    queries: ListSettlementTransactionsQueries,
  ): Promise<
    PaystackResponseInterface<
      ListSettlementTransactionsDatum[],
      SettlementListMeta
    > | null
  > => {
    const url = this.resourceUrl + "/:id/transactions";
    const method = "GET";

    return await this.paystackFetch<
      ListSettlementTransactionsDatum[],
      SettlementListMeta
    >(url, method, {}, { id }, queries as unknown as Record<string, unknown>);
  };
}
