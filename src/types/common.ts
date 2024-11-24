export interface PaginatedList {
  /** Specify how many records you want to retrieve per page. If not specify we use a default value of 50. */
  perPage: number;
  /** Specify exactly what page you want to retrieve. If not specify we use a default value of 1. */
  page: number;
}

export interface DateRangedList {
  /** A timestamp from which to start listing */
  from?: Date;
  /** A timestamp at which to stop listing */
  to?: Date;
}