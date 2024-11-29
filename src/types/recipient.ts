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

export interface CreateRecipientData {
  active: boolean;
  createdAt: string;
  currency: string;
  domain: string;
  id: number;
  integration: number;
  name: string;
  recipient_code: string;
  type: string;
  updatedAt: string;
  is_deleted: boolean;
  details: Details;
}

interface Details {
  authorization_code?: string;
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
}

export interface BulkCreateRecipientData {
  success: Success[];
  errors: unknown[];
}

interface Success {
  domain: string;
  name: string;
  type: string;
  description: string;
  integration: number;
  currency: string;
  metadata: Record<string, unknown>;
  details: Details;
  recipient_code: string;
  active: boolean;
  id: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ListRecipientsMeta {
  total: number;
  skipped: number;
  perPage: number;
  page: number;
  pageCount: number;
}

export interface ListRecipientsDatum {
  domain: string;
  type: string;
  currency: string;
  name: string;
  details: Details;
  metadata: Metadata;
  recipient_code: string;
  active: boolean;
  id: number;
  createdAt: string;
  updatedAt: string;
  integration?: number;
}

interface Metadata {
  job?: string;
}

export interface FetchRecipientData extends Omit<ListRecipientsDatum, 'integration'> {}

export interface UpdateRecipientData extends FetchRecipientData {}
