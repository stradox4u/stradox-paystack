import type { DateRangedList, PaginatedDateRangedList, PaginatedList } from "./common.ts";
import type { Customer, ListTransactionData } from "./transaction.ts";

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

export interface ListDisputeMeta {
  total: number;
  skipped: number;
  perPage: number;
  page: number;
  pageCount: number;
}

export interface ListDisputeDatum {
  id: number;
  refund_amount: number;
  currency: string;
  status: string;
  resolution: 'merchant-accepted' | 'declined' | null;
  domain: string;
  transaction: ListTransactionData;
  transaction_reference: string;
  category: string;
  customer: Customer;
  bin: string;
  last4: string;
  dueAt: string;
  resolvedAt: string;
  evidence: unknown;
  attachments: string;
  note: unknown;
  history: History[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

interface Message {
  sender: string;
  body: string;
  createdAt: string;
}

interface History {
  status: string;
  by: string;
  createdAt: string;
}

interface Message {
  sender: string;
  body: string;
  createdAt: string;
}

interface History {
  status: string;
  by: string;
  createdAt: string;
}

export interface ListTransactionDisputesDatum {
  history: DisputeHistory[];
  messages: DisputeMessage[];
  currency: string;
  last4: string;
  bin: string;
  transaction_reference: string;
  merchant_transaction_reference: string;
  refund_amount: number;
  status: string;
  domain: string;
  resolution: 'merchant-accepted' | 'declined' | null;
  category: string;
  note: string;
  attachments: string;
  id: number;
  integration: number;
  transaction: ListTransactionData;
  created_by: string;
  evidence: string;
  resolvedAt: string;
  createdAt: string;
  updatedAt: string;
  dueAt: string;
}

interface DisputeMessage extends Message {
  dispute: number;
  id: number;
  is_deleted: number;
  updatedAt: string;
}

interface DisputeHistory {
  id: number;
  dispute: number;
  status: string;
  by: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateDisputeData extends Omit<ListTransactionDisputesDatum, 'history' | 'messages' | 'integration'> {
  source: string;
  customer: Customer;
  organization: number;
}

export interface AddEvidenceData {
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  service_details: string;
  delivery_address: string;
  dispute: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetUploadUrlData {
  signedUrl: string;
  fileName: string;
}

export interface ResolveDisputeData extends UpdateDisputeData {
  message: DisputeMessage;
}

export interface ExportDisputesData {
  path: string;
  expiresAt: string;
}