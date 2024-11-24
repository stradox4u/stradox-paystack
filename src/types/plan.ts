import type { PaginatedList } from "./transaction.ts";

export interface CreatePlanBody {
  /** Name of plan */
  name: string;
  /** Amount shold be in the subunit of the supported currency */
  amount: number;
  /** Interval in words. Valid intervals are: `daily`, 'weekly`, `monthly`,
   * `quarterly`, `biannually` (every 6 months), `annually */
  interval: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'biannually' | 'annually';
  /** A description of this plan */
  description?: string;
  /** Set to false if you don't want invoices to be sent to your customers */
  send_invoices?: boolean;
  /** Set to false if you don't want text messages to be sent to your customers */
  send_sms?: boolean;
  /** Currency in which amount is set */
  currency?: string;
  /** Number of invoices to raise during subscription to this plan.
   * Can be overridden by specifying an `invoice_limit` while subscribing.
   */
  invoice_limit?: number;
}

export interface ListPlanQueries extends PaginatedList {
  /** Filter list by plans with specified status */
  status?: string;
  /** Filter list by plans with specified interval */
  interval?: string;
  /** Filter list by plans with the specified amount using the supported currency */
  amount?: number;
}

export interface UpdatePlanBody extends CreatePlanBody {
  /** Set to `true` if you want the existing subscriptions to use the new changes.
   * Set to `false` and only new subscriptions will be changed. Defaults to true when not set.
   */
  update_existing_subscriptions?: boolean;
}