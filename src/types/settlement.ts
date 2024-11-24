import type { DateRangedList, PaginatedList } from "./common.ts";

export interface ListSettlementQueries extends PaginatedList, DateRangedList {
  /** Fetch settlements based on their state. Value can be one of `success`, `processing`, `pending` or `failed` */
  status?: 'success' | 'processing' | 'pending' | 'failed';
  /** Provide a subaccount ID to export only settlements for that subaccount. Set to `none` to export only
   * transactions for the account.
   */
  subaccount?: string;
}

export interface ListSettlementTransactionsQueries extends PaginatedList, DateRangedList {}