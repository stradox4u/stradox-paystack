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