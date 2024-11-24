import type { DateRangedList, PaginatedList } from "./common.ts";

export interface CreateSubaccountBody {
  /** Name of business for subaccount */
  business_name: string;
  /** Bank code for the bank. You can get the list of bank codes by calling the `misc.listBanks` method */
  bank_code: string;
  /** Bank account number */
  account_number: string;
  /** The percentage the main account receives from each payment made to the subaccount */
  percentage_charge: number;
  /** A description for this subaccount */
  description?: string;
  /** A contact email for the subaccount */
  primary_contact_email?: string;
  /** A name for the contact person for this subaccount */
  primary_contact_name?: string;
  /** A phone number to call for this subaccount */
  primary_contact_phone?: string;
  /** Stringified JSON object. Add a `custom_fields` attribute which has an array of objects
   * if you would like the fields to be added to your transaction when displayed on the dashboard.
   * Sample: `{"custom_fields": [{"display_name": "Cart ID", "variable_name": "cart_id", "value": "8393"}]}`
   */
  metadata?: string;
}

export interface ListSubaccountQueries extends PaginatedList, DateRangedList { }

export interface UpdateSubaccountBody {
  /** Name of business for subaccount */
  business_name: string;
  /** A description for this subaccount */
  description: string;
  /** Bank code for the bank. You can get the list of bank codes by calling the `misc.listBanks` method */
  bank_code?: string;
  /** Bank account number */
  account_number?: string;
  /** Activate or deactivate a subaccount. Set value to `true` to activate subaccount or `false` to deactivate the subaccount */
  active?: boolean;
  /** The default percentage charged when receiving on behalf of this subaccount */
  percentage_charge?: number;
  /** A contact email for the subaccount */
  primary_contact_email?: string;
  /** A name for the contact person for this subaccount */
  primary_contact_name?: string;
  /** A phone number to call for this subaccount */
  primary_contact_phone?: string;
  /** Any of `auto`, `weekly`, `monthly` and `manual`. Auto means payout is T+1 and manual means
   * payout to the subaccount should only be made when requested. Defaults to `auto`
   */
  settlement_schedule?: 'auto' | 'weekly' | 'monthly' | 'manual';
  /** Stringified JSON object. Add a `custom_fields` attribute which has an array of objects
   * if you would like the fields to be added to your transaction when displayed on the dashboard.
   * Sample: `{"custom_fields": [{"display_name": "Cart ID", "variable_name": "cart_id", "value": "8393"}]}`
   */
  metadata?: string;
}