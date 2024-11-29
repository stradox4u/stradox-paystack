import type { DateRangedList, PaginatedList } from "./common.ts";
import type { Authorization, Customer, Log } from "./transaction.ts";

export interface ListSettlementQueries extends PaginatedList, DateRangedList {
  /** Fetch settlements based on their state. Value can be one of `success`, `processing`, `pending` or `failed` */
  status?: 'success' | 'processing' | 'pending' | 'failed';
  /** Provide a subaccount ID to export only settlements for that subaccount. Set to `none` to export only
   * transactions for the account.
   */
  subaccount?: string;
}

export interface ListSettlementTransactionsQueries extends PaginatedList, DateRangedList {}

export interface SettlementListMeta {
  total: number;
  skipped: number;
  perPage: number;
  page: number;
  pageCount: number;
  total_volume?: number;
}

export interface ListSettlementsDatum {
  id: number;
  domain: string;
  status: string;
  currency: string;
  integration: number;
  total_amount: number;
  effective_amount: number;
  total_fees: number;
  total_processed: number;
  deductions: number;
  settlement_date: string;
  settled_by: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface ListSettlementTransactionsDatum {
  id: number;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  message: string;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;
  ip_address: string;
  metadata: Metadata;
  log: Log;
  fees: number;
  fees_split: unknown;
  customer: Customer;
  authorization: Authorization;
  plan: Record<string, unknown>;
  split: Record<string, unknown>;
  subaccount: Record<string, unknown>;
  order_id: string;
  paidAt: string;
  createdAt: string;
  requested_amount: number;
  source: Source;
  pos_transaction_data: unknown;
}

interface Source {
  source: string;
  type: string;
  identifier: string;
  entry_point: string;
}

interface Metadata {
  custom_fields: Customfield[];
}

interface Customfield {
  value: string;
  display_name: string;
  variable_name: string;
}