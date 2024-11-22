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

  public sendEvent = async (terminalId: string, body: SendEventBody<TerminalInvoiceEvent | TerminalTransactionEvent>): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:terminalId/event';
    const method = 'POST';
  
    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>, { terminalId });
  }

  public fetchEventStatus = async (terminalId: string, eventId: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:terminalId/event/:eventId';
    const method = 'GET';
  
    return await this.tools.paystackFetch(url, method, {}, { terminalId, eventId });
  }

  public fetchStatus = async (terminalId: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:terminalId/presence';
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {}, { terminalId });
  }

  public list = async (queries: ListTerminalQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl;
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  public fetch = async (terminalId: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:terminalId';
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {}, { terminalId });
  }

  public update = async (terminalId: string, body: UpdateTerminalBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:terminalId';
    const method = 'PUT';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>, { terminalId });
  }

  public commission = async (body: { serial_number: string; }): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/commission_device';
    const method = 'POST';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  public decommission = async(body: { serial_number: string; }): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/decommission_device';
    const method = 'POST';

    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }
}