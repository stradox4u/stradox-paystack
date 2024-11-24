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