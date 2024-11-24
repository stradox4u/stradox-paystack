import type { PaginatedDateRangedList } from "./common.ts";

export interface InitiateBulkCharge {
  authorization: string;
  amount: number;
  reference: string;
}

export interface FetchChargesQueries extends PaginatedDateRangedList {
  /** Either one of these values: `pending`, `success` or `failed` */
  status: 'pending' | 'success' | 'failed';
}