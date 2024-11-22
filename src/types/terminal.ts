export type TerminalInvoiceEvent = {
  /** The type of event to push. We currently support `invoice` and `transaction` */
  type: 'invoice';
  /** The action the terminal needs to perform, `process` or `view` */
  action: 'process' | 'view';
  /** The parameters needed to perform the specified action */
  data: {
    /** The invoice_id */
    id: string;
    /** The offline_reference */
    reference: string;
  }
}

export type TerminalTransactionEvent = {
  /** The type of event to push. We currently support `invoice` and `transaction` */
  type: 'transaction';
  /** The action the terminal needs to perform, `process` or `print` */
  action: 'process' | 'print';
  /** The parameters needed to perform the specified action */
  data: {
    /** The transaction_id */
    id: string;
  }
}

export interface SendEventBody<T extends TerminalInvoiceEvent | TerminalTransactionEvent> {
  type: T["type"];
  action: T["action"];
  data: T["data"];
}

export interface ListTerminalQueries {
  /** Specify how many records you want to retrieve per page. If not specified, we use a default value of 50 */
  perPage: number;
  /** A cursor that indicates your place in the list. It can be used to fetch the next page of the list. */
  next?: string;
  /** A cursor that indicates your place in the list. It should be used to fetch the previous page of the list after an initial request. */
  previous?: string;
}

export interface UpdateTerminalBody {
  /** The name of the terminal */
  name: string;
  /** The address of the terminal */
  address: string;
}