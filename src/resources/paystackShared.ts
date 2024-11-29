import type {
  FetchData,
  FetchHeaders,
  FetchMethod,
} from "../types/endpoint.ts";
import type { PaystackResponseInterface } from "../types/response.ts";

/**
 * This class collects shared methods and functionality for reaching the Paystack API
 */
export default class PaystackShared {
  private secretKey: string;
  private rootUrl = "https://api.paystack.co";

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  /**
   * @function paystackFetch
   * This method is used to make requests to the Paystack API
   * @param {string} url
   * @param {string} method
   * @param {Record<string, string>} body
   * @param {Record<string, string>} params
   * @param {Record<string, string>} queryParams
   * @returns {Promise<PaystackResponseInterface<T, S = undefined> | null>} response - A promise that resolves to the PaystackResponseInterface type, with the data property being of type T
   */
  protected async paystackFetch<T, S = undefined>(
    url: string,
    method: FetchMethod,
    body: Record<string, unknown> | string,
    params?: Record<string, string>,
    queryParams?: Record<string, unknown>,
  ): Promise<PaystackResponseInterface<T, S> | null> {
    let builtUrl = this.rootUrl + url;
    if (params && Object.keys(params).length > 0) {
      Object.keys(params).forEach((key) => {
        builtUrl = builtUrl.replace(`:${key}`, params[key]);
      });
    }
    if (queryParams) {
      Object.keys(queryParams).forEach((key, index) => {
        builtUrl += `${index === 0 ? "?" : "&"}${key}=${queryParams[key]}`;
      });
    }

    const headers: FetchHeaders = {
      Authorization: `Bearer ${this.secretKey}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (Object.keys(body).length === 0) {
      delete headers["Content-Type"];
    }

    const data: FetchData = { method, headers };
    if (method !== "GET" && typeof body !== "string") {
      data.body = JSON.stringify(body);
    }

    const response = await fetch(
      builtUrl,
      data as unknown as Record<string, string>,
    );
    return await response.json();
  }
}
