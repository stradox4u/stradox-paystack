export interface ResolveAccountQueries {
  /** Account number */
  account_number: string;
  /** You can get the list of bank codes by calling the `misc.listBanks` method */
  bank_code: string;
}

export interface ValidateAccountBody {
  /** Customer's first and last name registered with their bank */
  account_name: string;
  /** Customer's account number */
  account_number: string;
  /** Type of account, one of: `personal` or `business` */
  account_type: 'personal' | 'business';
  /** The bank code of the customer's bank. You can fetch the bank codes by using the `misc.listBanks` method */
  bank_code: string;
  /** The two digit ISO code of the customer's country */
  country_code: string;
  /** Customer's mode of identity. This is one of `identityNumber`, `passportNumber`, `businessRegistrationNumber` */
  document_type: 'identityNumber' | 'passportNumber' | 'businessRegistrationNumber';
  /** Customer's mode of identity number */
  document_number: string;
}