import type { PaystackResponseInterface } from "../types/response.ts";
import type {
  ResolveAccountData,
  ResolveAccountQueries,
  ResolveBinData,
  ValidateAccountBody,
  ValidateAccountData,
} from "../types/verification.ts";
import PaystackShared from "./paystackShared.ts";

export default class Verification extends PaystackShared {
  private readonly resourceUrl = "/bank";

  constructor(secretKey: string) {
    super(secretKey);
  }

  /**
   * @function resolveAccount
   * Confirm an account belongs to the right customer
   * @param queries
   * @returns {Promise<PaystackResponseInterface<ResolveAccountData> | null>} accountInfo - The account information
   */
  public resolveAccount = async (
    queries: ResolveAccountQueries,
  ): Promise<PaystackResponseInterface<ResolveAccountData> | null> => {
    const url = this.resourceUrl + "/resolve";
    const method = "GET";

    return await this.paystackFetch<ResolveAccountData>(
      url,
      method,
      {},
      {},
      queries as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function validateAccount
   * Confirm the authenticity of a customer's account number before sending money
   * @param body
   * @returns {Promise<PaystackResponseInterface<ValidateAccountData> | null>} verificationState - The state of the account verification
   */
  public validateAccount = async (
    body: ValidateAccountBody,
  ): Promise<PaystackResponseInterface<ValidateAccountData> | null> => {
    const url = this.resourceUrl + "/validate";
    const method = "POST";

    return await this.paystackFetch<ValidateAccountData>(
      url,
      method,
      body as unknown as Record<string, unknown>,
    );
  };

  /**
   * @function resolveBin
   * Get more information about a customer's card
   * @param bin - First 6 characters of card
   * @returns {Promise<PaystackResponseInterface<ResolveBinData> | null>} cardInfo - The card's information
   */
  public resolveBin = async (
    bin: string,
  ): Promise<PaystackResponseInterface<ResolveBinData> | null> => {
    const url = "/decision/bin/:bin";
    const method = "GET";

    return await this.paystackFetch<ResolveBinData>(url, method, {}, { bin });
  };
}
