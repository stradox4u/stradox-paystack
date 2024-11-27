import type { PaginatedDateRangedList } from "./common.ts";
import type { Authorization, Customer, Log } from "./transaction.ts";

export interface InitiateBulkCharge {
  authorization: string;
  amount: number;
  reference: string;
}

export interface FetchChargesQueries extends PaginatedDateRangedList {
  /** Either one of these values: `pending`, `success` or `failed` */
  status: 'pending' | 'success' | 'failed';
}

export interface InitiateBulkChargeData {
  batch_code: string;
  reference: string;
  id: number;
  integration: number;
  domain: string;
  status: string;
  total_charges: number;
  pending_charges: number;
  createdAt: string;
  updatedAt: string;
}

export interface ListBatchesData {
  domain: string;
  batch_code: string;
  status: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface FetchBatchData {
  domain: string;
  batch_code: string;
  status: string;
  id: number;
  total_charges: number;
  pending_charges: number;
  createdAt: string;
  updatedAt: string;
}

export interface FetchChargesData {
  integration: number;
  bulkcharge: number;
  customer: Customer;
  authorization: Authorization;
  transaction: ChargeTransaction;
  domain: string;
  amount: number;
  currency: string;
  status: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface ChargeTransaction {
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
  metadata: string;
  log: Log;
  fees: number;
  fees_split: unknown;
  customer: Customer;
  authorization: Authorization;
  plan: Record<string, unknown>;
  subaccount: Record<string, unknown>;
  paidAt: string;
  createdAt: string;
}

