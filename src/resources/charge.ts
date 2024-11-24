import type { CreateChargeBody, SubmitAddressBody, SubmitBirthdayBody, SubmitOtpBody, SubmitPhoneBody, SubmitPinBody } from "../types/charge.ts";
import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

export default class Charge extends PaystackShared {
  private readonly resourceUrl = '/charge';

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function create
   * Initiate a payment by integrating the payment channel of your choice.
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public create = async (body: CreateChargeBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl;
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function submitPin
   * Submit PIN to continue a charge
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public submitPin = async (body: SubmitPinBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/submit_pin';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function submitOtp
   * Submit OTP to complete a charge
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public submitOtp = async (body: SubmitOtpBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/submit_otp';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function submitPhone
   * Submit phone number when requested
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public submitPhone = async (body: SubmitPhoneBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/submit_phone';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function submitBirthday
   * Submit birthday when requested
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public submitBirthday = async (body: SubmitBirthdayBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/submit_birthday';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function submitAddress
   * Submit address to continue a charge
   * @param body
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public submitAddress = async (body: SubmitAddressBody): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/submit_address';
    const method = 'POST';

    return await this.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function checkPending
   * Check pending charge
   * @param reference - The reference to check
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public checkPending = async (reference: string): Promise<PaystackResponseInterface | null> => {
    const url = this.resourceUrl + '/:reference';
    const method = 'GET';

    return await this.paystackFetch(url, method, {}, { reference });
  }
}