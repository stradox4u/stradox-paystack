import type { FetchData, FetchHeaders, FetchMethod } from "../types/endpoint.ts";
import type { PaystackResponseInterface } from "../types/response.ts";

/**
 * This class collects shared methods and functionality for reaching the Paystack API
 */
export default class PaystackShared {
  private secretKey: string;
  private paystackUrl = 'https://api.paystack.co';
  private static thisInstance: PaystackShared;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  public static getInstance(secretKey: string) {
    if (!PaystackShared.thisInstance) {
      PaystackShared.thisInstance = new PaystackShared(secretKey);
    }
    return PaystackShared.thisInstance;
  }


  /**
   * @function paystackFetch
   * This method is used to make requests to the Paystack API
   * @param {string} url 
   * @param {string} method 
   * @param {Record<string, string>} body 
   * @param {Record<string, string>} params 
   * @param {Record<string, string>} queryParams 
   * @returns {Promise<PaystackResponseInterface | null>}
   */
  public paystackFetch = async (url: string, method: FetchMethod, body: Record<string, unknown>, params?: Record<string, string>, queryParams?: Record<string, unknown>): Promise<PaystackResponseInterface | null> => {
    let builtUrl = this.paystackUrl + url;
    if (params && Object.keys(params).length > 0) {
      Object.keys(params).forEach((key) => {
        builtUrl = builtUrl.replace(`:${key}`, params[key]);
      });
    }
    if (queryParams) {
      Object.keys(queryParams).forEach((key, index) => {
        builtUrl += `${index === 0 ? '?' : '&'}${key}=${queryParams[key]}`;
      });
    }

    const headers: FetchHeaders = {
      Authorization: `Bearer ${this.secretKey}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    if (Object.keys(body).length === 0) {
      delete headers['Content-Type'];
    };

    const data: FetchData = { method, headers };
    if (method !== 'GET') {
      data.body = JSON.stringify(body);
    }
  
    const response = await fetch(builtUrl, data as unknown as Record<string, string>);
    return await response.json();
  }
}