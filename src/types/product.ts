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

