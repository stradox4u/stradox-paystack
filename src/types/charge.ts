import { Authorization, Customer, Log, Metadata } from "./transaction.ts";

export interface CreateChargeBody {
  /** Customer's email address */
  email: string;
  /** Amount in subunit of the supported currency */
  amount: number;
  /** The split code of a previously created split. e.g. `SPL_98WF13Eb3w` */
  split_code?: string;
  /** The code for the subaccount that owns the payment. e.g. `ACCT_8f4s1eq7ml6rlzj` */
  subaccount?: string;
  /** An amount used to override the split configuration for a single split payment. If set, the amount
   * specified goes to the main account regardless of the split configuration.
   */
  transaction_charge?: number;
  /** Use this param to indicate who bears the transaction charges. Allowed values are: `account` or `subaccount`
   * (defaults to `account`)
   */
  bearer?: 'account' | 'subaccount';
  /** Bank account to charge (don't send if charging an authorization code) */
  bank?: {
    code: string;
    account_number: string;
  }
  /** Takes the settings for the Pay with Transfer (PwT) channel. Pass in the `account_expires_at` param
   * to set the expiry time.
   */
  bank_transfer?: Record<string, unknown>;
  /** USSD type to charge (don't send if charging an authorization code, bank or card) */
  ussd?: Record<string, unknown>;
  /** Mobile details (don't send if charging an authorization code, bank or card) */
  mobile_money?: Record<string, unknown>;
  /** Takes a provider object with either of the following values: `scan-to-pay`, `visa` */
  qr?: Record<string, unknown>;
  /** An authorization code to charge (don't send if charging a bank account) */
  authorization_code?: string;
  /** 4-digit PIN (send with a non-reusable authorization code) */
  pin?: string;
  /** Used for passing additional details for your post-payment processes */
  metadata?: Record<string, unknown>;
  /** Unique transaction reference. Only `-`, `.`, `=` and alphanumeric characters allowed */
  reference?: string;
  /** This is the unique identifier of the device a user uses in making payment. Only `-`, `.`,
   * `=` and alphanumeric characters allowed */
  device_id?: string;
}

interface ReferenceOnly {
  /** Reference for ongoing transaction */
  reference: string;
}

export interface SubmitPinBody extends ReferenceOnly {
  /** PIN submitted by user */
  pin: string;
}

export interface SubmitOtpBody extends ReferenceOnly {
  /** OTP submitted by user */
  otp: string;
}

export interface SubmitPhoneBody extends ReferenceOnly {
  /** Phone submitted by user */
  phone: string;
}

export interface SubmitBirthdayBody extends ReferenceOnly {
  /** Birthday submitted by user in YYYY-MM-DD format */
  birthday: string;
}

export interface SubmitAddressBody extends ReferenceOnly {
  /** Address submitted by user */
  address: string;
  /** City submitted by user */
  city: string;
  /** State submitted by user */
  state: string;
  /** Zipcode submitted by user */
  zipcode: string;
}

export interface CreateChargeData {
  amount: number;
  currency: string;
  transaction_date: string;
  status: string;
  reference: string;
  domain: string;
  metadata: Metadata;
  gateway_response: string;
  message: string;
  channel: string;
  ip_address: string;
  log: Log;
  fees: number;
  authorization: Authorization;
  customer: Customer;
  plan: Record<string, unknown>;
}

export interface SubmitDataResponseData {
  id: number;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  message: string;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;
  ip_address: string;
  metadata: string;
  log: Log;
  fees: number;
  fees_split: unknown;
  authorization: Authorization;
  customer: Customer;
  plan: Record<string, unknown>;
  split: Record<string, unknown>;
  order_id: null;
  paidAt: string;
  createdAt: string;
  requested_amount: number;
  pos_transaction_data: null;
  source: null;
  fees_breakdown: null;
  transaction_date: string;
  plan_object: Record<string, unknown>;
  subaccount: Record<string, unknown>;
}

export interface CheckPendingData {
  amount: number;
  currency: string;
  transaction_date: string;
  status: string;
  reference: string;
  domain: string;
  metadata: Metadata;
  gateway_response: string;
  message: string;
  channel: string;
  ip_address: string;
  log: Log;
  fees: number;
  authorization: Authorization;
  customer: Customer;
  plan: Record<string, unknown>;
}