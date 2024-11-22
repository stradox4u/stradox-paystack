import type { PaystackResponseInterface } from "../types/response.ts";
import type { SendEventBody, TerminalInvoiceEvent, TerminalTransactionEvent } from "../types/terminal.ts";
import PaystackShared from "./paystackShared.ts";

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
}