import type { DateRangedList, PaginatedList } from "./common.ts";

type BearerType = 'account' | 'subaccount';

type TransactionStatus = 'failed' | 'success' | 'abandoned' | 'pending' | 'cancelled';

export interface InitializeTransactionBody {
  amount: number;
  email: string;
  currency?: string;
  reference?: string;
  callback_url?: string;
  plan?: string;
  invoice_limit?: number;
  metadata?: Record<string, unknown>;
  channels?: string[];
  split_code?: string;
  subaccount?: string;
  transaction_charge?: number;
  bearer?: BearerType;
}

export interface ListTransactionQueries extends PaginatedList, DateRangedList {
  customer?: string;
  terminalid?: string;
  status?: TransactionStatus;
  amount?: number;
}

export interface ChargeAuthorizationBody {
  amount: string;
  email: string;
  authorization_code: string;
  reference?: string;
  currency?: string;
  metadata?: Record<string, unknown>;
  channels?: 'card' | 'bank'[],
  subaccount?: string;
  transaction_charge?: number;
  bearer?: BearerType;
  queue?: boolean;
}

export interface TotalTransactionQueries extends PaginatedList {
  from: Date;
  to: Date;
}

export interface ExportTransactionQueries extends PaginatedList, DateRangedList {
  customer?: number;
  status?: TransactionStatus;
  currency?: string;
  amount?: number;
  settled?: boolean;
  settlement?: number;
  payment_page?: number;
}

export interface PartialDebitBody {
  authorization_code: string;
  currency: string;
  amount: string;
  email: string;
  reference?: string;
  at_least?: string;
}

export interface InitializeTransactionData {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface VerifyTransactionData {
  id: number;
  domain: string;
  status: string;
  reference: string;
  receipt_number: string;
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
  authorization: Authorization;
  customer: Customer;
  plan: unknown;
  split: Record<string, unknown>;
  order_id: string;
  paidAt: string;
  createdAt: string;
  requested_amount: number;
  pos_transaction_data: unknown;
  source: unknown;
  fees_breakdown: unknown;
  connect: unknown;
  transaction_date: string;
  plan_object: Record<string, unknown>;
  subaccount: Record<string, unknown>;
}

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
  phone: string;
  metadata: Metadata;
  risk_action: string;
  international_format_phone: string;
}

interface Authorization {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  reusable: boolean;
  signature: string;
  account_name: string;
}

interface Log {
  start_time: number;
  time_spent: number;
  attempts: number;
  errors: number;
  success: boolean;
  mobile: boolean;
  input: unknown[];
  history: History[];
}

interface History {
  type: string;
  message: string;
  time: number;
}

export interface ListTransactionData {
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
  metadata: Record<string, unknown>;
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
  connect: unknown;
  pos_transaction_data: unknown;
}

interface Source {
  source: string;
  type: string;
  identifier: null;
  entry_point?: string;
}

export interface FetchTransactionData {
  id: number;
  domain: string;
  status: string;
  reference: string;
  receipt_number: number;
  amount: number;
  message: string;
  gateway_response: string;
  helpdesk_link: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;
  ip_address: string;
  metadata: string;
  log: Log;
  fees: number;
  fees_split: unknown;
  authorization: Authorization;
  customer: Customer;
  plan: Record<string, unknown>;
  subaccount: Record<string, unknown>;
  split: Record<string, unknown>;
  order_id: string;
  paidAt: string;
  createdAt: string;
  requested_amount: number;
  pos_transaction_data: unknown;
  source: Source;
  fees_breakdown: unknown;
  connect: unknown;
}

interface Metadata {
  custom_fields: Customfield[];
}

interface Customfield {
  display_name: string;
  variable_name: string;
  value: string;
}

export interface ChargeAuthorizationData {
  amount: number;
  currency: string;
  transaction_date: string;
  status: string;
  reference: string;
  domain: string;
  metadata: string;
  gateway_response: string;
  message: string;
  channel: string;
  ip_address: string;
  log: unknown;
  fees: number;
  authorization: Authorization;
  customer: Customer;
  plan: Record<string, unknown>;
  id: number;
}

export interface TransactionTimelineData {
  start_time: number;
  time_spent: number;
  attempts: number;
  errors: number;
  success: boolean;
  mobile: boolean;
  input: unknown[];
  history: History[];
}

export interface TransactionTotalsData {
  total_transactions: number;
  total_volume: number;
  total_volume_by_currency: Totalvolumebycurrency[];
  pending_transfers: number;
  pending_transfers_by_currency: Totalvolumebycurrency[];
}

interface Totalvolumebycurrency {
  currency: string;
  amount: number;
}

export interface ExportTransactionData {
  path: string;
  expiresAt: string;
}

export interface PartialDebitData {
  amount: number;
  currency: string;
  transaction_date: string;
  status: string;
  reference: string;
  domain: string;
  metadata: string;
  gateway_response: string;
  message: string;
  channel: string;
  ip_address: string;
  log: unknown;
  fees: number;
  authorization: Authorization;
  customer: Customer;
  plan: number;
  requested_amount: number;
  id: number;
}