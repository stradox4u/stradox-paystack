import type { PaginatedDateRangedList } from "./common.ts";
import type { ListTransactionData } from "./transaction.ts";

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

export interface CreateRefundData {
  transaction: ListTransactionData;
  integration: number;
  deducted_amount: number;
  channel: string;
  merchant_note: string;
  customer_note: string;
  status: string;
  refunded_by: string;
  expected_at: string;
  currency: string;
  domain: string;
  amount: number;
  fully_deducted: boolean;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ListRefundDatum {
  id: number;
  integration: number;
  domain: string;
  transaction: number;
  dispute: number;
  amount: number;
  deducted_amount: null | number;
  currency: string;
  channel: string;
  fully_deducted: null | number;
  refunded_by: string;
  refunded_at: string;
  expected_at: string;
  settlement: unknown;
  customer_note: string;
  merchant_note: string;
  created_at: string;
  updated_at: string;
  status: string;
}