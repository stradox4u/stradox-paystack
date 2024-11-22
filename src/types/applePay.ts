export interface ListApplePayDomainsQueries {
  /** Flag to enable cursor pagination on the endpoint */
  use_cursor: boolean;
  /** A cursor that indicates your place in the list. It can be used to fetch the next page of the list */
  next?: string;
  /** A cursor that indicates your place in the list.
   * It should be used to fetch the previous page of the list after an initial next request */
  previous?: string;
}