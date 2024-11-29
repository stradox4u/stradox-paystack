import type { PaginatedList } from "./common.ts";
import type { ListPlansDatum } from "./plan.ts";
import type { Authorization, Customer } from "./transaction.ts";

export interface CreateSubscriptionBody {
  /** Customer's email address or customer code */
  customer: string;
  /** Plan code */
  plan: string;
  /** If the customer has multiple authorizations, you can set the desired authorization you wish to use
   * for this subscription here. If this is not supplied, the customer's most recent authorization will be used.
   */
  authorization?: string;
  /** Set the date for the first debit (ISO 8601 format) e.g. 2017-05-16T00:30:13+01:00 */
  start_date?: string;
}

export interface ListSubscriptionQueries extends PaginatedList {
  /** Filter by customer id */
  customer?: number;
  /** Filter by plan id */
  plan?: number;
}

export interface ToggleSubscriptionBody {
  /** Subscription code */
  code: string;
  /** Email token */
  token: string;
}

export interface CreateSubscriptionData {
  customer: number;
  plan: number;
  integration: number;
  domain: string;
  start: number;
  status: string;
  quantity: number;
  amount: number;
  subscription_code: string;
  email_token: string;
  authorization: Authorization;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ListSubscriptionsMeta {
  total: number;
  skipped: number;
  perPage: number;
  page: number;
  pageCount: number;
}

export interface ListSubscriptionsDatum {
  customer: Customer;
  plan: Plan;
  integration: number;
  authorization: Authorization;
  domain: string;
  start: number;
  status: string;
  quantity: number;
  amount: number;
  subscription_code: string;
  email_token: string;
  easy_cron_id: string;
  cron_expression: string;
  next_payment_date: string;
  open_invoice: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface Plan extends Omit<ListPlansDatum, "subscriptions"> {
  migrate: unknown;
}

export interface FetchSubscriptionData {
  invoices: unknown[];
  customer: Customer;
  plan: Plan;
  integration: number;
  authorization: Authorization;
  domain: string;
  start: number;
  status: string;
  quantity: number;
  amount: number;
  subscription_code: string;
  email_token: string;
  easy_cron_id: unknown;
  cron_expression: string;
  next_payment_date: string;
  open_invoice: unknown;
  id: number;
  createdAt: string;
  updatedAt: string;
}


export interface GenerateLinkData {
  link: string;
}