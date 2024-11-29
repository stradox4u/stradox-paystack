import type { DateRangedList, PaginatedList } from "./common.ts";

type SplitBearerType = 'subaccount' | 'account' | 'all-proportional' | 'all';

export interface CreateSplitBody {
  name: string;
  type: 'percentage' | 'flat';
  currency: string;
  subaccounts: {
    subaccount: string;
    share: number;
  }[];
  bearer_type: SplitBearerType;
  bearer_subaccount: string;
}

export interface ListSplitQueries extends Partial<PaginatedList>, DateRangedList {
  name: string;
  active: boolean;
  sort_by?: string;
}

export interface UpdateSplitBody {
  name: string;
  active: boolean;
  bearer_type?: SplitBearerType;
  bearer_subaccount?: string;
}

export interface AddSubaccountSplitBody {
  subaccount: string;
  share: number;
}

export interface CreateSplitData {
  id: number;
  name: string;
  type: string;
  currency: string;
  integration: number;
  domain: string;
  split_code: string;
  active: boolean;
  bearer_type: string;
  createdAt: string;
  updatedAt: string;
  is_dynamic: boolean;
  subaccounts: Subaccount[];
  total_subaccounts: number;
}

interface Subaccount {
  subaccount: SubaccountDetail;
  share: number;
}

interface SubaccountDetail {
  id: number;
  subaccount_code: string;
  business_name: string;
  description: string;
  primary_contact_name: string;
  primary_contact_email: string;
  primary_contact_phone: string;
  metadata: Record<string, unknown>;
  settlement_bank: string;
  currency: string;
  account_number: string;
}

export interface ListSplitsMeta {
  total: number;
  skipped: number;
  perPage: number;
  page: number;
  pageCount: number;
}

export interface ListSplitsDatum extends CreateSplitData {
  bearer_subaccount: string;
}

export interface FetchSplitData extends ListSplitsDatum {}

export interface UpdateSplitData extends ListSplitsDatum {}

export interface AddSubaccountSplitData extends ListSplitsDatum{}

