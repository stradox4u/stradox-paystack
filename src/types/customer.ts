import type { PaginatedList, DateRangedList } from "./transaction.ts";

export interface CreateCustomerBody {
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  metadata?: Record<string, unknown>;
}

export interface ListCustomerQueries extends PaginatedList, DateRangedList { }

export interface UpdateCustomerBody {
  first_name: string;
  last_name: string;
  phone?: string;
  metadata?: Record<string, unknown>;
}

export interface ValidateCustomerBody {
  first_name: string;
  last_name: string;
  type: 'bank_account';
  value: string;
  country: string;
  bvn: string;
  bank_code: string;
  account_number: string;
  middle_name?: string;
}

export interface WhiteOrBlacklistBody {
  /** customer code or email address */
  customer: string;
  /** all customers start with default; use allow to whitelist, and deny to blacklist */
  risk_action: 'default' | 'allow' | 'deny';
}