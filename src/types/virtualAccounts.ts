export interface CreateVirtualAccountBody {
  /** Customer id or code */
  customer: string;
  /** The slug for the preferred bank
   * To get a list of available banks, use the `misc.listBanks` method,
   * passing `pay_with_bank_transfer=true` query parameter
   */
  preferred_bank?: string;
  /** Subaccount code of the subaccount you want to split the transaction with */
  subaccount?: string;
  /** Split code consisting of the list of accounts you want to split the transaction with */
  split_code?: string;
  /** Customer's first name */
  first_name?: string;
  /** Customer's last name */
  last_name?: string;
  /** Customer's phone number */
  phone?: string;
}

export interface AssignVirtualAccountBody {
  /** Customer's email address */
  email: string;
  /** Customer's first name */
  first_name: string;
  /** Customer's last name */
  last_name: string;
  /** Customer's phone number */
  phone: string;
  /** The slug for the preferred bank
   * To get a list of available banks, use the `misc.listBanks` method,
   * passing `pay_with_bank_transfer=true` query parameter
   */
  preferred_bank: string;
  /** Currently accepts `NG` only */
  country: 'NG';
  /** Customer's account number */
  account_number?: string;
  /** Customer's Bank Verification Number */
  bvn?: string;
  /** Customer's bank code */
  bank_code?: string;
  /** Subaccount code of the subaccount you want to split the transaction with */
  subaccount?: string;
  /** Split code consisting of the list of accounts you want to split the transaction with */
  split_code?: string;
}

export interface ListVirtualAccountQueries {
  /** Status of the dedicated virtual account */
  active: boolean;
  /** The currency of the dedicated virtual account. Only `NGN` is currently allowed */
  currency: string;
  /** The bank's slug in lowercase and without spaces, e.g. `wema-bank` */
  provider_slug?: string;
  /** The bank's id, e.g `035` */
  bank_id?: string;
  /** The customer's id */
  customer?: string;
}

export interface RequeryVirtualAccountQueries {
  /** Virtual account number to requery */
  account_number: string;
  /** The bank's slug in lowercase and without spaces, e.g. `wema-bank` */
  provider_slug: string;
  /** The day the transfer was made in `YYYY-MM-DD` format */
  date?: string;
}

export interface SplitVirtualAccountTransactionBody {
  /** Customer id or code */
  customer: string;
  /** Subaccount code of the account you want to split the transaction with */
  subaccount?: string;
  /** Split code consisting of the list of accounts you want to split the transaction with */
  split_code?: string;
  /** The slug for the preferred bank
   * To get a list of available banks, use the `virtualAccount.fetchProviders` method
   */
  preferred_bank?: string;
}