export interface ResendOtpBody {
  /** Transfer code */
  transfer_code: string;
  /** Either `resend_otp` or `transfer` */
  reason: 'resend_otp' | 'transfer';
}

export interface FinalizeDisableOtpBody {
  /** OTP sent to business phone to verify disabling OTP requirement */
  otp: string;
}

export interface CheckBalanceDatum {
  currency: string;
  balance: number;
}

export interface FetchLedgerMeta {
  total: number;
  skipped: number;
  perPage: number;
  page: number;
  pageCount: number;
}

export interface FetchLedgerDatum {
  integration: number;
  domain: string;
  balance: number;
  currency: string;
  difference: number;
  reason: string;
  model_responsible: string;
  model_row: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

