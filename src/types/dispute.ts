import type { DateRangedList, PaginatedDateRangedList, PaginatedList } from "./common.ts";

export interface ListDisputeQueries extends PaginatedDateRangedList{
  /** Transaction id */
  transaction?: string
  /** Dispute status. Acceptable values are `awaiting-merchant-feedback`, `awaiting-bank-feedback`
   * `pending` or `resolved`
   */
  status: 'awaiting-merchant-feedback' | 'awaiting-bank-feedback' | 'pending' | 'resolved';
}

export interface UpdateDisputeBody {
  /** The amount to refund, in the subunit of the supported currency */
  refund_amount: number;
  /** Filename of attachment returned via response from `dispute.getUploadUrl` */
  uploaded_filename?: string;
}

export interface AddEvidenceBody {
  /** Customer email */
  customer_email: string;
  /** Customer name */
  customer_name: string;
  /** Customer phone */
  customer_phone: string;
  /** Details of service involved */
  service_details: string;
  /** Delivery address */
  delivery_address?: string;
  /** ISO 8601 representation of delivery date (YYYY-MM-DD) */
  delivery_date?: string;
}

export interface GetUploadUrlQueries {
  /** The file name, with its extension that you want to upload. e.g. filename.pdf */
  upload_filename: string;
}

export interface ResolveDisputeBody {
  /** Dispute resolution. Accepted values: `merchant-accepted` or `declined` */
  resolution: 'merchant-accepted' | 'declined';
  /** Reason for resolution */
  message: string;
  /** The amount to refund, in the subunit of the supported currency */
  refund_amount: number;
  /** Filename of attachment returned via response from `dispute.getUploadUrl` */
  uploaded_filename: string;
  /** Evidence Id for fraud claims */
  evidence?: number;
}

export interface ExportDisputeQueries extends Required<DateRangedList>, Partial<PaginatedList> {
  /** Transaction ID */
  transaction?: string;
  /** Dispute status. Acceptable values are `awaiting-merchant-feedback`, `awaiting-bank-feedback`, `pending` or `resolved` */
  status?: 'awaiting-merchant-feedback' | 'awaiting-bank-feedback' | 'pending' | 'resolved';
}