import type { PaginatedDateRangedList } from "./common.ts";

export interface InitiateTransferBody {
  /** Where should we transfer from? Only `balance` for now */
  source: 'balance';
  /** Amount to transfer in kobo if currency is `NGN`, and pesewas if currency is `GHS` */
  amount: number;
  /** Code for transfer recipient */
  recipient: string;
  /** The reason for the transfer */
  reason?: string;
  /** Specify the currency of the transfer. Defaults to `NGN` */
  currency?: string;
  /** A unique identifier required in Kenya for MPESA Paybill and Till Transfers */
  account_reference?: string;
  /** If specified, the field should be a unique identifier (in lowercase) for the object.
   * Only -, _ and alphanumeric characters allowed.
   */
  reference?: string;
}

export interface FinalizeTransferBody {
  /** The transfer code you want to finalize */
  transfer_code: string;
  /** OTP sent to business phone to verify transfer */
  otp: string;
}

export interface BulkInitiateTransferBody {
  /** Specify the currency of the transfers. Defaults to `NGN` */
  currency?: string;
  /** Where should we transfer from? Only `balance` for now */
  source: 'balance';
  /** A list of transfer objects. Each object should contain `amount`, `recipient` and `reference` */
  transfers: Omit<InitiateTransferBody, 'source'>[];
}

export interface ListTransferQueries extends PaginatedDateRangedList {
  /** Filter by the recipient ID */
  recipient: number;
}

export interface InitiateTransferData {
  integration: number;
  domain: string;
  amount: number;
  currency: string;
  source: string;
  reason: string;
  recipient: number;
  status: string;
  transfer_code: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface FinalizeTransferData extends InitiateTransferData {
  reference: string;
  source_details: unknown;
  failures: unknown;
  titan_code: string;
  transferred_at: string;
}

export interface BulkInitiateTransferDatum {
  reference: string;
  recipient: string;
  amount: number;
  transfer_code: string;
  currency: string;
  status: string;
}

export interface ListTransfersMeta {
  total: number;
  skipped: number;
  perPage: number;
  page: number;
  pageCount: number;
}

export interface ListTransfersDatum extends Omit<InitiateTransferData, 'recipient'> {
  recipient: Recipient;
  source_details: unknown;
  failures: unknown;
}

interface Recipient {
  domain: string;
  type: string;
  currency: string;
  name: string;
  details: Details;
  description: string;
  metadata: Record<string, unknown>;
  recipient_code: string;
  active: boolean;
  id: number;
  integration: number;
  createdAt: string;
  updatedAt: string;
}

interface Details {
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
}

export interface FetchTransferData extends ListTransfersDatum {
  reference: string;
  titan_code: string;
  request: number;
  transferred_at: string;
  session: Session;
  fee_charged: number;
  fees_breakdown: unknown;
  gateway_response: string;
}

interface Session {
  provider: string;
  id: unknown;
}

export interface VerifyTransferData extends FetchTransferData {}