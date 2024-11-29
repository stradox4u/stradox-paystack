import type { PaginatedList, DateRangedList } from "./common.ts";
import { Authorization, ListTransactionData } from "./transaction.ts";

export interface CreateCustomerBody {
  /** Customer's email address */
  email: string;
  /** Customer's first name */
  first_name: string;
  /** Customer's last name */
  last_name: string;
  /** Customer's phone number */
  phone?: string;
  /** A set of key/value pairs that you can attach to the customer.
   * It can be used to store additional data in a structured format (JSON).
   */
  metadata?: Record<string, unknown>;
}

export interface ListCustomerQueries extends PaginatedList, DateRangedList { }

export interface UpdateCustomerBody {
  /** Customer's first name */
  first_name: string;
  /** Customer's last name */
  last_name: string;
  /** Customer's phone number */
  phone?: string;
  /** A set of key/value pairs that you can attach to the customer.
   * It can be used to store additional data in a structured format (JSON).
   */
  metadata?: Record<string, unknown>;
}

export interface ValidateCustomerBody {
  /** Customer's first name */
  first_name: string;
  /** Customer's last name */
  last_name: string;
  /** Predefined types of identification. only `bank account` is supported at the moment */
  type: 'bank_account';
  /** Customer's identification number */
  value: string;
  /** 2 letter country code of identification issuer */
  country: string;
  /** Customer's Bank Verification Number */
  bvn: string;
  /** You can get the list of banks by calling the `misc.listBanks` method
   * required if type is `bank_account`
   */
  bank_code: string;
  /** Customer's bank account number 
   * required if type is `bank_account`
  */
  account_number: string;
  /** Customer's middle name */
  middle_name?: string;
}

export interface WhiteOrBlacklistBody {
  /** customer code or email address */
  customer: string;
  /** all customers start with default; use allow to whitelist, and deny to blacklist */
  risk_action: 'default' | 'allow' | 'deny';
}

export interface CreateCustomerData {
  email: string;
  integration: number;
  domain: string;
  customer_code: string;
  id: number;
  identified: boolean;
  identifications: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface ListCustomerData {
  integration: number;
  first_name: null | string;
  last_name: null | string;
  email: string;
  phone: null | string;
  metadata: Record<string, unknown>;
  domain: string;
  customer_code: string;
  risk_action: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface FetchCustomerData {
  transactions: ListTransactionData[];
  subscriptions: unknown[];
  authorizations: Authorization[];
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  metadata: Record<string, unknown>;
  domain: string;
  customer_code: string;
  risk_action: string;
  id: number;
  integration: number;
  createdAt: string;
  updatedAt: string;
  created_at: string;
  updated_at: string;
  total_transactions: number;
  total_transaction_value: unknown[];
  dedicated_account: unknown;
  identified: boolean;
  identifications: unknown[];
}

export interface UpdateCustomerData {
  integration: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  metadata: Metadata;
  identified: boolean;
  identifications: unknown[];
  domain: string;
  customer_code: string;
  id: number;
  transactions: ListTransactionData[];
  subscriptions: unknown[];
  authorizations: Authorization[];
  createdAt: string;
  updatedAt: string;
}

interface Metadata {
  photos: Photo[];
}

interface Photo {
  type: string;
  typeId: string;
  typeName: string;
  url: string;
  isPrimary: boolean;
}

export interface WhiteOrBlacklistData {
  first_name: string;
  last_name: string;
  email: string;
  phone: null;
  metadata: Record<string, unknown>;
  domain: string;
  identified: boolean;
  identifications: unknown[];
  customer_code: string;
  risk_action: string;
  id: number;
  integration: number;
  createdAt: string;
  updatedAt: string;
}
