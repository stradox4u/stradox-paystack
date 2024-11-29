import type { PaystackResponseInterface } from "../types/response.ts";
import type {
  FetchEventStatusData,
  FetchStatusData,
  FetchTerminalData,
  ListTerminalDatum,
  ListTerminalMeta,
  ListTerminalQueries,
  SendEventBody,
  SendEventData,
  TerminalInvoiceEvent,
  TerminalTransactionEvent,
  UpdateTerminalBody,
} from "../types/terminal.ts";
import PaystackShared from "./paystackShared.ts";

/**
 * This class contains methods for working with the Terminal resource of the Paystack API
 */
export default class Terminal extends PaystackShared {
  private readonly resourceUrl = "/terminal";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function sendEvent
   * Send an event from your application to the Paystack Terminal
   * @param {string} terminalId
   * @param {SendEventBody<TerminalInvoiceEvent | TerminalTransactionEvent} body
   * @returns {Promise<PaystackResponseInterface<SendEventData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type SendEventData
   */
  public sendEvent = async (
    terminalId: string,
    body: SendEventBody<TerminalInvoiceEvent | TerminalTransactionEvent>,
  ): Promise<PaystackResponseInterface<SendEventData> | null> => {
    const url = this.resourceUrl + "/:terminalId/event";
    const method = "POST";

    return await this.paystackFetch<SendEventData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { terminalId },
    );
  };

  /**
   * @function fetchEventStatus
   * Check the status of an event sent to the Terminal
   * @param {string} terminalId
   * @param {string} eventId
   * @returns {Promise<PaystackResponseInterface<FetchEventStatusData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type FetchEventStatusData
   */
  public fetchEventStatus = async (
    terminalId: string,
    eventId: string,
  ): Promise<PaystackResponseInterface<FetchEventStatusData> | null> => {
    const url = this.resourceUrl + "/:terminalId/event/:eventId";
    const method = "GET";

    return await this.paystackFetch<FetchEventStatusData>(url, method, {}, {
      terminalId,
      eventId,
    });
  };

  /**
   * @function fetchStatus
   * Check the availability of a Terminal before sending an event to it
   * @param {string} terminalId
   * @returns {Promise<PaystackResponseInterface<FetchStatusData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type FetchStatusData
   */
  public fetchStatus = async (
    terminalId: string,
  ): Promise<PaystackResponseInterface<FetchStatusData> | null> => {
    const url = this.resourceUrl + "/:terminalId/presence";
    const method = "GET";

    return await this.paystackFetch<FetchStatusData>(url, method, {}, {
      terminalId,
    });
  };

  /**
   * @function list
   * List the terminals available on your integration
   * @param {ListTerminalQueries} queries
   * @returns {Promise<PaystackResponseInterface<ListTerminalDatum[], ListTerminalMeta> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type ListTerminalDatum[]
   */
  public list = async (
    queries: ListTerminalQueries,
  ): Promise<
    PaystackResponseInterface<ListTerminalDatum[], ListTerminalMeta> | null
  > => {
    const url = this.resourceUrl;
    const method = "GET";

    return await this.paystackFetch<ListTerminalDatum[], ListTerminalMeta>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function fetch
   * Fetch the details of a Terminal
   * @param {string} terminalId
   * @returns {Promise<PaystackResponseInterface<FetchTerminalData> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type FetchTerminalData
   */
  public fetch = async (
    terminalId: string,
  ): Promise<PaystackResponseInterface<FetchTerminalData> | null> => {
    const url = this.resourceUrl + "/:terminalId";
    const method = "GET";

    return await this.paystackFetch<FetchTerminalData>(url, method, {}, {
      terminalId,
    });
  };

  /**
   * @function update
   * Update the details of a Terminal
   * @param {string} terminalId
   * @param {UpdateTerminalBody} body
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a boolean status property and a message property
   */
  public update = async (
    terminalId: string,
    body: UpdateTerminalBody,
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/:terminalId";
    const method = "PUT";

    return await this.paystackFetch<undefined>(
      url,
      method,
      body as unknown as Record<string, unknown>,
      { terminalId },
    );
  };

  /**
   * @function commission
   * Activate your debug device by linking it to your integration
   * @interface CommissionTerminalBody
   * @property {string} serial_number
   * @param {CommissionTerminalBody} body
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a boolean status property and a message property
   */
  public commission = async (
    body: { serial_number: string },
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/commission_device";
    const method = "POST";

    return await this.paystackFetch<undefined>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function decommission
   * Unlink your debug device from your integration
   * @param {CommissionTerminalBody} body
   * @returns {Promise<PaystackResponseInterface<undefined> | null>} response - A promise that resolves to the PaystackResponseInterface type, with a boolean status property and a message property
   */
  public decommission = async (
    body: { serial_number: string },
  ): Promise<PaystackResponseInterface<undefined> | null> => {
    const url = this.resourceUrl + "/decommission_device";
    const method = "POST";

    return await this.paystackFetch<undefined>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };
}
