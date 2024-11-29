import type { DateRangedList, PaginatedList } from "./common.ts";

export interface CreatePaymentPageBody {
  /** Name of page */
  name: string;
  /** A description for this page */
  description?: string;
  /** Amount should be in the subunit of the supported currency */
  amount?: number;
  /** The transaction currency. Defaults to your integration currency */
  currency?: string;
  /** URL slug you would like to be associated with this page. Page will be accessible at
   * https://paystack.com/pay/[slug]
   */
  slug?: string;
  /** The type of payment page to create. Options are `payment`, `subscription`, `product` and `plan`.
   * Defaults to `payment` if no type is specified.
   */
  type?: 'payment' | 'subscription' | 'product' | 'plan';
  /** The `ID` of the plan to subscribe customers on this payment page to when `type` is set to
   * `subscription`
   */
  plan?: string;
  /** Specifies whether to collect a fixed amount on the payment page. If true, `amount` must be passed */
  fixed_amount?: boolean;
  /** The split code of the transaction split, e.g. `SPL_98WF13Eb3w` */
  split_code?: string;
  /** Extra data to configure the payment page including subaccount, logo image, transaction charge */
  metadata?: Record<string, unknown>;
  /** If you would like Paystack to redirect someplace upon successful payment, specify the URL here. */
  redirect_url?: string;
  /** A success message to display to the customer after a successful transaction */
  success_message?: string;
  /** An email address that will receive transaction notifications for this payment page */
  notification_email?: string;
  /** Specify whether to collect phone numbers on the payment page. */
  collect_phone?: boolean;
  /** If you would like to accept custom fields, specify them here */
  custom_fields?: string[];
}

export interface ListPaymentPageQueries extends PaginatedList, DateRangedList {}

export interface UpdatePaymentPageBody {
  /** Name of page */
  name: string;
  /** A description for this page */
  description: string;
  /** Default amount you want to accept using this page. If none is set, customer is free to provide any
   * amount of their choice. The latter scenario is useful for accepting donations.
   */
  amount?: number;
  /** Set to false to deactivate the page url */
  active?: boolean;
}

export interface AddProductBody {
  /** Ids of all the products */
  product: number[];
}

export interface CreatePaymentPageData {
  name: string;
  description: string;
  amount: number;
  split_code: string;
  integration: number;
  domain: string;
  slug: string;
  currency: string;
  type: string;
  collect_phone: boolean;
  active: boolean;
  published: boolean;
  migrate: boolean;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ListPaymentPageMeta {
  total: number;
  skipped: number;
  perPage: string;
  page: number;
  pageCount: number;
}

export interface ListPaymentPageDatum {
  integration: number;
  plan: null | number;
  domain: string;
  name: string;
  description: null | string;
  amount: null | number;
  currency: string;
  slug: string;
  custom_fields: Customfield[] | null;
  redirect_url: null | string;
  active: boolean;
  migrate: unknown;
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface Customfield {
  display_name: string;
  variable_name: string;
}

export interface FetchPaymentPageData {
  integration: number;
  domain: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  slug: string;
  active: boolean;
  id: number;
  createdAt: string;
  updatedAt: string;
  products: Product[];
}

interface Product {
  product_id: number;
  name: string;
  description: string;
  product_code: string;
  page: number;
  price: number;
  currency: string;
  quantity: number;
  type: string;
  features: unknown;
  is_shippable: number;
  domain: string;
  integration: number;
  active: number;
  in_stock: number;
}

export interface UpdatePaymentPageData {
  domain: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  slug: string;
  active: boolean;
  id: number;
  integration: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddProductsData {
  integration: number;
  plan: unknown;
  domain: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  slug: string;
  custom_fields: unknown[];
  type: string;
  redirect_url: string;
  success_message: string;
  collect_phone: boolean;
  active: boolean;
  published: boolean;
  migrate: boolean;
  notification_email: string;
  metadata: Record<string, unknown>;
  id: number;
  createdAt: string;
  updatedAt: string;
  products: Product[];
}