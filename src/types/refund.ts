import type { PaginatedDateRangedList } from "./common.ts";

export interface CreateRefundBody {
  /** Transaction reference or id */
  transaction: string;
  /** Amount, in the subunit of the supported currency to be refunded to the customer.
   * It is optional (defaults to the original transaction amount) and cannot be more than
   * the original transaction amount.
   */
  amount?: number;
  /** Any of the supported currencies */
  currency?: string;
  /** Customer reason */
  customer_note?: string;
  /** Merchant reason */
  merchant_note?: string;
}

export interface ListRefundQueries extends Partial<PaginatedDateRangedList>{
  /** The transaction ID of the refunded transaction */
  transaction: string;
  /** Any of the supported currencies */
  currency: string;
}