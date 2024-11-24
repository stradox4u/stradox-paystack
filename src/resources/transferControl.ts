import type { PaystackResponseInterface } from "../types/response.ts";
import type { FinalizeDisableOtpBody, ResendOtpBody } from "../types/transferControl.ts";
import PaystackShared from "./paystackShared.ts";

export default class TransferControl extends PaystackShared {
  private readonly resourceUrl = '/transfer';

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function checkBalance
   * Fetch the available balance on your integration
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public checkBalance = async (): Promise<PaystackResponseInterface | null> => {
    const url = '/balance';
    const method = 'GET';

    return await this.paystackFetch(url, method, {});
  }

  /**
   * @function fetchLedger
   * Fetch all pay-ins and pay-outs that occurred on your integration
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetchLedger = async (): Promise<PaystackResponseInterface | null> => {
    const url = '/balance/ledger';
    const method = 'GET';

    return await this.paystackFetch(url, method, {});
  }

  /**
   * @function resendOtp
   * Generates a new OTP and sends to customer in the event they are having trouble
   * receiving one.
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public resendOtp = async (body: ResendOtpBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/resend_otp';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function disableOtp
   * This is used in the event that you want to be able to complete transfers programmatically, without
   * the use of OTPs. No arguments required. You will get an OTP to complete the request.
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public disableOtp = async (): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/disable_otp';
    const method = 'POST';

    return await this.paystackFetch(url, method, {});
  }

  /**
   * @function finalizeDisableOtp
   * Finalize the request to disable OTP on your transfers.
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public finalizeDisableOtp = async (body: FinalizeDisableOtpBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/disable_otp_finalize';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function enableOtp
   * In the event that a customer wants to stop being able to complete transfers programmatically,
   * this endpoint helps turn OTP requirement back on. No arguments required.
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public enableOtp = async (): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/enable_otp';
    const method = 'POST';

    return await this.paystackFetch(url, method, {});
  }
}