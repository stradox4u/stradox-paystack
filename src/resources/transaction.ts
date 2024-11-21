import { PaystackResponseInterface } from "../types/response.ts";
import { ChargeAuthorizationBody, ExportTransactionQueries, InitializeTransactionBody, ListTransactionQueries, PartialDebitBody, TotalTransactionQueries } from "../types/transaction.ts";
import PaystackShared from "./paystackShared.ts";

export default class Transaction {
  private readonly rootUrl = '/transaction';
  private readonly tools: PaystackShared;

  constructor(secretKey: string) {
    this.tools = PaystackShared.getInstance(secretKey);
  }

  public initialize = async (body: InitializeTransactionBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/initialize';
    const method = 'POST';
  
    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  public verify = async (reference: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/verify' + '/:reference';
    const method = 'GET';
  
    return await this.tools.paystackFetch(url, method, {}, { reference });
  }

  public list = async (queries: ListTransactionQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl;
    const method = 'GET';
  
    return await this.tools.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  public fetch = async (transactionId: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:transactionId';
    const method = 'GET';
  
    return await this.tools.paystackFetch(url, method, {}, { transactionId});
  }

  public charge_authorization = async (body: ChargeAuthorizationBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/charge_authorization';
    const method = 'POST';
  
    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  public timeline = async (transactionIdOrReference: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/timeline' + '/:transactionIdOrReference';
    const method = 'GET';
  
    return await this.tools.paystackFetch(url, method, {}, { transactionIdOrReference });
  }

  public totals = async (queries: TotalTransactionQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/totals';
    const method = 'GET';
  
    return await this.tools.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  public export = async (queries: ExportTransactionQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/export';
    const method = 'GET';
  
    return await this.tools.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  public partial_debit = async (body: PartialDebitBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/partial_debit';
    const method = 'POST';
  
    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }
}