export interface ListBanksQueries {
  /** The country from which to obtain the list of supported banks */
  country: 'ghana' | 'kenya' | 'nigeria' | 'south africa';
  /** Flag to enable cursor based pagination */
  use_cursor: boolean;
  /** The number of objects to return per page. Defaults to 50 and is limited to 100 records per page */
  perPage: number;
  /** A flag to filter for available banks a customer can make a transfer to complete a payment */
  pay_with_bank_transfer?: boolean;
  /** A flag to filter for banks a customer can pay directly from */
  pay_with_bank?: boolean;
  /** A flag to filter the banks that are supported for account verification in South Africa.
   * You need to combine this with either the `currency` or `country` filter
   */
  enabled_for_verification?: boolean;
  /** A cursor that indicates your place in the list. It can be used to fetch the next page of the list */
  next?: string;
  /** A cursor that indicates your place in the list. It should be used to fetch the previous page of 
   * the list after an initial next request
   */
  previous?: string;
  /** The gateway type of the bank. It can be one of: `emandate` or `digitalbankmandate` */
  gateway?: 'emandate' | 'digitalbankmandate';
  /** Type of financial channel. For Ghanaian channels, please use either `mobile_money` for mobile
   * money channels or `ghipps` for bank channels
   */
  type?: string;
  /** One of the supported currencies */
  currency?: string;
}

export interface ListStatesQueries {
  /** The country code of the states to list. It is gotten after the charge request */
  country: number;
}