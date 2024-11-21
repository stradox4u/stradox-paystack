type BearerType = 'account' | 'subaccount';

type TransactionStatus = 'failed' | 'success' | 'abandoned' | 'pending' | 'cancelled';

export interface PaginatedList {
  perPage: number;
  page: number;
}

export interface DateRangedList {
  from?: Date;
  to?: Date;
}

export interface InitializeTransactionBody {
  amount: number;
  email: string;
  currency?: string;
  reference?: string;
  callback_url?: string;
  plan?: string;
  invoice_limit?: number;
  metadata?: Record<string, unknown>;
  channels?: string[];
  split_code?: string;
  subaccount?: string;
  transaction_charge?: number;
  bearer?: BearerType;
}

export interface ListTransactionQueries extends PaginatedList, DateRangedList {
  customer?: string;
  terminalid?: string;
  status?: TransactionStatus;
  amount?: number;
}

export interface ChargeAuthorizationBody {
  amount: string;
  email: string;
  authorization_code: string;
  reference?: string;
  currency?: string;
  metadata?: Record<string, unknown>;
  channels?: 'card' | 'bank'[],
  subaccount?: string;
  transaction_charge?: number;
  bearer?: BearerType;
  queue?: boolean;
}

export interface TotalTransactionQueries extends PaginatedList {
  from: Date;
  to: Date;
}

export interface ExportTransactionQueries extends PaginatedList, DateRangedList {
  customer?: number;
  status?: TransactionStatus;
  currency?: string;
  amount?: number;
  settled?: boolean;
  settlement?: number;
  payment_page?: number;
}

export interface PartialDebitBody {
  authorization_code: string;
  currency: string;
  amount: string;
  email: string;
  reference?: string;
  at_least?: string;
}