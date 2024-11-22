import type { PaystackResponseInterface } from "../types/response.ts";
import type { AddSubaccountSplitBody, CreateSplitBody, ListSplitQueries, UpdateSplitBody } from "../types/split.ts";
import PaystackShared from "./paystackShared.ts";

export default class Split {
  private readonly rootUrl = '/split';
  private readonly tools: PaystackShared;

  constructor(secretKey: string) {
    this.tools = PaystackShared.getInstance(secretKey);
  }

  public create = async (body: CreateSplitBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl;
    const method = 'POST';
  
    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>);
  }

  public list = async (queries: ListSplitQueries): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl;
    const method = 'GET';

    return await this.tools.paystackFetch(url, method, {}, {}, queries as unknown as Record<string, unknown>);
  }

  public fetch = async (splitId: string): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:splitId';
    const method = 'GET';
  
    return await this.tools.paystackFetch(url, method, {}, { splitId });
  }

  public update = async (splitId: string, body: UpdateSplitBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:splitId';
    const method = 'PUT';
  
    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>, { splitId });
  }

  public addSubaccountSplit = async (splitId: string, body: AddSubaccountSplitBody): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:splitId/subaccount/add';
    const method = 'POST';
  
    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>, { splitId });
  }

  public removeSubaccountSplit = async(splitId: string, body: { subaccount: string }): Promise<PaystackResponseInterface | null> => {
    const url = this.rootUrl + '/:splitId/subaccount/remove';
    const method = 'POST';
  
    return await this.tools.paystackFetch(url, method, body as unknown as Record<string, unknown>, { splitId });
  }
}