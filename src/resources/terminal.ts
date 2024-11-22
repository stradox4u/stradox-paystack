import type { PaystackResponseInterface } from "../types/response.ts";
import type { ListTerminalQueries, SendEventBody, TerminalInvoiceEvent, TerminalTransactionEvent, UpdateTerminalBody } from "../types/terminal.ts";
import PaystackShared from "./paystackShared.ts";

/**
 * This class contains methods for working with the Terminal resource of the Paystack API
 */
export default class Terminal {
  private readonly rootUrl = '/terminal';
  private readonly tools: PaystackShared;

  constructor(secretKey: string) {
    this.tools = PaystackShared.getInstance(secretKey);
  }

  /**
   * @function sendEvent
   * Send an event from your application to the Paystack Terminal
   * @param {string} terminalId 
   * @param {SendEventBody<TerminalInvoiceEvent | TerminalTransactionEvent} body 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public sendEvent = async (terminalId: string, body: SendEventBody<TerminalInvoiceEvent | TerminalTransactionEvent>): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:terminalId/event';
    const method = 'POST';
  
    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>, { terminalId });
  }

  /**
   * @function fetchEventStatus
   * Check the status of an event sent to the Terminal
   * @param {string} terminalId 
   * @param {string} eventId 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetchEventStatus = async (terminalId: string, eventId: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:terminalId/event/:eventId';
    const method = 'GET';
  
    return await this.tools.paystackFetch(url, method, {}, { terminalId, eventId });
  }

  /**
   * @function fetchStatus
   * Check the availability of a Terminal before sending an event to it
   * @param {string} terminalId 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetchStatus = async (terminalId: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:terminalId/presence';
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {}, { terminalId });
  }

  /**
   * @function list
   * List the terminals available on your integration
   * @param {ListTerminalQueries} queries 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public list = async (queries: ListTerminalQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl;
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  /**
   * @function fetch
   * Fetch the details of a Terminal
   * @param {string} terminalId 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public fetch = async (terminalId: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:terminalId';
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {}, { terminalId });
  }

  /**
   * @function update
   * Update the details of a Terminal
   * @param {string} terminalId 
   * @param {UpdateTerminalBody} body 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public update = async (terminalId: string, body: UpdateTerminalBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:terminalId';
    const method = 'PUT';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>, { terminalId });
  }

  /**
   * @function commission
   * Activate your debug device by linking it to your integration
   * @interface CommissionTerminalBody
   * @property {string} serial_number
   * @param {CommissionTerminalBody} body 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public commission = async (body: { serial_number: string; }): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/commission_device';
    const method = 'POST';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  /**
   * @function decommission
   * Unlink your debug device from your integration
   * @param {CommissionTerminalBody} body 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public decommission = async(body: { serial_number: string; }): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/decommission_device';
    const method = 'POST';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }
}