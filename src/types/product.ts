import type { DateRangedList, PaginatedList } from "./common.ts";

export interface CreateProductBody {
  /** Name of the product */
  name: string;
  /** A description for the product */
  description: string;
  /** Price should be in the subunit of the supported currency */
  price: number;
  /** Currency in which price is set */
  currency: string;
  /** Set to true if the product has unlimited stock. Leave as false if the product has limited stock */
  unlimited?: boolean;
  /** Number of products in stock. Use if unlimited is false */
  quantity?: number;
}

export interface ListProductQueries extends PaginatedList, DateRangedList {}

export interface CreateProductData {
  name: string;
  description: string;
  currency: string;
  price: number;
  quantity: number;
  is_shippable: boolean;
  unlimited: boolean;
  integration: number;
  domain: string;
  metadata: Metadata;
  slug: string;
  product_code: string;
  quantity_sold: number;
  type: string;
  shipping_fields: ShippingFields;
  active: boolean;
  in_stock: boolean;
  minimum_orderable: number;
  maximum_orderable: number;
  low_stock_alert: boolean;
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface ShippingFields {
  delivery_note: string;
  shipping_fees?: ShippingFee[];
}

interface Metadata {
  background_color: string;
}

export interface ListProductsMeta {
  total: number;
  skipped: number;
  perPage: number;
  page: number;
  pageCount: number;
}

export interface ListProductsDatum {
  id: number;
  name: string;
  description: string;
  product_code: string;
  slug: string;
  currency: string;
  price: number;
  quantity: number;
  quantity_sold: number;
  active: boolean;
  domain: string;
  type: string;
  in_stock: boolean;
  unlimited: boolean;
  metadata: Metadata;
  files: File[];
  success_message: null | string;
  redirect_url: null | string;
  split_code: null | string;
  notification_emails: unknown[];
  minimum_orderable: number;
  maximum_orderable: number;
  createdAt: string;
  updatedAt: string;
  digital_assets: unknown[];
  variant_options: unknown[];
  is_shippable: boolean;
  shipping_fields: ShippingFields;
  integration: number;
  low_stock_alert: number;
}

interface ShippingFee {
  region: string;
  fee: number;
  currency: string;
}

interface File {
  key: string;
  type: string;
  path: string;
  original_filename: string;
}


export interface FetchProductData extends ListProductsDatum {
  file_path: string;
  features: unknown[];
  stock_threshold: number;
  expires_in: number;
}


export interface UpdateProductData {
  name: string;
  description: string;
  product_code: string;
  price: number;
  currency: string;
  quantity: number;
  quantity_sold: number;
  type: string;
  image_path: string;
  file_path: string;
  is_shippable: boolean;
  unlimited: boolean;
  domain: string;
  active: boolean;
  features: unknown[];
  in_stock: boolean;
  metadata: Record<string, unknown>;
  id: number;
  integration: number;
  createdAt: string;
  updatedAt: string;
}