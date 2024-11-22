import type { DateRangedList, PaginatedList } from "./transaction.ts";

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