import type { PaystackResponseInterface } from "../types/response.ts";
import PaystackShared from "./paystackShared.ts";

interface UpdateTimeoutBody {
  /** Time before stopping session (in seconds). Set to 0 to cancel session timeouts */
  timeout: number;
}

interface TimeoutResponseData {
  payment_session_timeout: number;
}

export default class Integration extends PaystackShared {
  private readonly resourceUrl = "/integration";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function fetchTimeout
   * Fetch the payment session timeout on your integration
   * @returns {Promise<PaystackResponseInterface<TimeoutResponseData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type TimeoutResponseData
   */
  public fetchTimeout = async (): Promise<
    PaystackResponseInterface<TimeoutResponseData> | null
  > => {
    const url = this.resourceUrl + "/payment_session_timeout";
    const method = "GET";

    return await this.paystackFetch<TimeoutResponseData>(url, method, {});
  };

  /**
   * @function updateTimeout
   * Update the payment session timeout (in seconds) on your integration
   * @param body
   * @returns {Promise<PaystackResponseInterface<TimeoutResponseData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type TimeoutResponseData
   */
  public updateTimeout = async (
    body: UpdateTimeoutBody,
  ): Promise<PaystackResponseInterface<TimeoutResponseData> | null> => {
    const url = this.resourceUrl + "/payment_session_timeout";
    const method = "PUT";

    return await this.paystackFetch<TimeoutResponseData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };
}
