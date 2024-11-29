import type { DateRangedList, PaginatedList } from "./common.ts";
import type { Authorization, Customer, ListTransactionData } from "./transaction.ts";

interface LineItem {
  name: string;
  amount: number;
  quantity: number;
}

interface TaxItem {
  name: string;
  amount: number;
}

export interface CreatePaymentRequestBody {
  /** Customer ID or code */
  customer: string;
  /** Payment request amount. It should be used when line items and tax values aren't specified. */
  amount: number;
  /** ISO 8601 representation of request due date */
  due_date?: string;
  /** A short description of the payment request */
  description?: string;
  /** Array of line items in the format: `[{"name":"item 1", "amount":2000, "quantity": 1}]` */
  line_items?: LineItem[];
  /** Array of taxes to be charged in the format: `[{"name":"VAT", "amount":2000}]` */
  tax?: TaxItem[];
  /** Specify the currency of the payment request. Defaults to `NGN` */
  currency?: string;
  /** Indicates whether Paystack sends an email notification to the customer. Defaults to true. */
  send_notification?: boolean;
  /** Indicate if request should be saved as draft. Defaults to false and overrides send_notification */
  draft?: boolean;
  /** Set to `true` to create a draft payment request (adds an auto incrementing payment request number if none
   * is provided) even if there are no `line_items` or `tax` passed. 
   */
  has_invoice?: boolean;
  /** Numeric value of the payment request. Payment requests will start from 1 and auto increment from there.
   * This field is to help override whatever value Paystack decides. Auto increment for subsequent
   * payment requests continue from this point.
   */
  invoice_number?: number;
  /** The split code of the transaction split e.g. `SPL_98WF13Eb3w` */
  split_code?: string;
}

export interface ListPaymentRequestQueries extends PaginatedList, DateRangedList {
  /** Filter by customer ID */
  customer: string;
  /** Filter by payment request status */
  status: string;
  /** Filter by currency */
  currency: string;
  /** Show archived payment requests */
  include_archive: boolean;
}

export interface FinalizePaymentRequestBody {
  /** Indicates whether Paystack sends an email notification to the customer. Defaults to `true` */
  send_notification: boolean;
}

export type UpdatePaymentRequestBody = Omit<CreatePaymentRequestBody, 'has_invoice'>;

export interface CreatePaymentRequestData {
  id: number;
  domain: string;
  amount: number;
  currency: string;
  due_date: string;
  has_invoice: boolean;
  invoice_number: number;
  description: string;
  line_items: LineItem[];
  tax: LineItem[];
  request_code: string;
  status: string;
  paid: boolean;
  metadata: null;
  notifications: unknown[];
  offline_reference: string;
  customer: number;
  created_at: string;
}

export interface ListPaymentRequestMeta {
  total: number;
  skipped: number;
  perPage: number;
  page: number;
  pageCount: number;
}

export interface ListPaymentRequestDatum {
  id: number;
  domain: string;
  amount: number;
  currency: string;
  due_date: string;
  has_invoice: boolean;
  invoice_number: number;
  description: string;
  pdf_url: string;
  line_items: LineItem[];
  tax: LineItem[];
  request_code: string;
  status: string;
  paid: boolean;
  paid_at: string;
  metadata: Record<string, unknown>;
  notifications: unknown[];
  offline_reference: string;
  customer: RequestCustomer;
  created_at: string;
}

interface RequestCustomer extends Omit<Customer, 'metadata'> {
  metadata: Metadata;
}

interface Metadata {
  calling_code: string;
}

export interface FetchPaymentRequestData {
  transactions: ListTransactionData[];
  domain: string;
  request_code: string;
  description: string;
  line_items: LineItem[];
  tax: LineItem[];
  amount: number;
  discount: number;
  currency: string;
  due_date: string;
  status: string;
  paid: boolean;
  paid_at: string;
  metadata: Record<string, unknown>;
  has_invoice: boolean;
  invoice_number: number;
  offline_reference: string;
  pdf_url: string;
  notifications: unknown[];
  archived: boolean;
  source: string;
  payment_method: unknown;
  note: unknown;
  amount_paid: string;
  id: number;
  integration: number;
  customer: Customer;
  createdAt: string;
  updatedAt: string;
  pending_amount: number;
}

export interface FullPaymentRequestCustomer extends Omit<RequestCustomer, 'international_format_phone'> {
  transactions: ListTransactionData[];
  subscriptions: unknown[];
  authorizations: Authorization[];
  domain: string;
  integration: number;
  createdAt: string;
  updatedAt: string;
}

export interface VerifyPaymentRequestData {
  id: number;
  domain: string;
  amount: number;
  currency: string;
  due_date: string;
  has_invoice: boolean;
  invoice_number: number;
  description: string;
  pdf_url: string;
  line_items: LineItem[];
  tax: LineItem[];
  request_code: string;
  status: string;
  paid: boolean;
  paid_at: string;
  metadata: Record<string, unknown>;
  notifications: unknown[];
  offline_reference: string;
  customer: RequestCustomer;
  created_at: string;
  integration: Integration;
  pending_amount: number;
}

interface Integration {
  key: string;
  name: string;
  logo: string;
  allowed_currencies: string[];
}


export interface RequestTotalData {
  pending: CurrencyData[];
  successful: CurrencyData[];
  total: CurrencyData[];
}

interface CurrencyData {
  currency: string;
  amount: number;
}

export interface FinalizePaymentRequestData extends Omit<VerifyPaymentRequestData, 'integration'> {}

export interface UpdatePaymentRequestData extends Omit<FinalizePaymentRequestData, 'pending_amount'> {}


