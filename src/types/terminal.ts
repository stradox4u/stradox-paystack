export type TerminalInvoiceEvent = {
  type: 'invoice';
  action: 'process' | 'view';
  data: {
    id: string;
    reference: string;
  }
}

export type TerminalTransactionEvent = {
  type: 'transaction';
  action: 'process' | 'print';
  data: {
    id: string;
  }
}

export interface SendEventBody<T extends TerminalInvoiceEvent | TerminalTransactionEvent> {
  type: T["type"];
  action: T["action"];
  data: T["data"];
}