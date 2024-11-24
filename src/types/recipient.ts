export interface CreateRecipientBody {
  /** Recipient type. It could be one of `nuban`, `ghipss`, `mobile_money` or `basa` */
  type: 'nuban' | 'ghipss' | 'mobile_money' | 'basa';
  /** The recipient's name according to their account registration */
  name: string;
  /** The recipient's account number */
  account_number: string;
  /** The recipient's bank code. you can get the list of Bank Codes by calling the `misc.listBanks` method */
  bank_code: string;
  /** A description for this recipient */
  description?: string;
  /** Currency for the account receiving the transfer */
  currency?: string;
  /** An authorization code from a previous transaction */
  authorization_code?: string;
  /** Store additional information about your recipient in a structured format (JSON) */
  metadata?: Record<string, unknown>;
}

export interface UpdateRecipientBody {
  /** A name for the recipient */
  name: string;
  /** Email address of the recipient */
  email: string;
}