// Event types are built from Paystack's sample payloads. Samples in the same
// group (such as the three transfer Events) are merged: fields missing from
// some samples are optional, and fields that are null in every sample are
// `unknown`. See docs/adr/0001-closed-union-for-event-types.md.

type Mode = "test" | "live";

/** An object Paystack sometimes sends empty (`{}`) in place of `T` */
type Empty<T> = { [K in keyof T]?: undefined };

interface DisputeEventData {
  id: number;
  refund_amount: number;
  currency: string;
  status: string;
  resolution: string | null;
  domain: Mode;
  transaction: DisputeTransaction;
  transaction_reference: unknown;
  category: string;
  customer: DisputeCustomer;
  bin: string;
  last4: string;
  dueAt: string;
  resolvedAt: string | null;
  evidence: unknown;
  attachments: unknown;
  note: unknown;
  history: DisputeHistory[];
  messages: DisputeMessage[];
  created_at: string;
  updated_at: string;
}

interface DisputeTransaction {
  id: number;
  domain: Mode;
  status: string;
  reference: string;
  amount: number;
  message: unknown;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;
  ip_address: unknown;
  metadata: unknown;
  log: unknown;
  fees: number;
  fees_split: unknown;
  authorization: Record<string, unknown>;
  customer: { international_format_phone: unknown };
  plan: Record<string, unknown>;
  subaccount: Record<string, unknown>;
  split: Record<string, unknown>;
  order_id: unknown;
  paidAt: string;
  requested_amount: number;
  pos_transaction_data: unknown;
}

interface DisputeCustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
  phone: string;
  metadata: unknown;
  risk_action: string;
  international_format_phone: unknown;
}

interface DisputeHistory {
  status: string;
  by: string;
  createdAt: string;
}

interface DisputeMessage {
  sender: string;
  body: string;
  createdAt: string;
}

interface ChargeSuccessLog {
  time_spent: number;
  attempts: number;
  authentication: string;
  errors: number;
  success: boolean;
  mobile: boolean;
  input: unknown[];
  channel: unknown;
  history: ChargeSuccessLogHistory[];
}

interface ChargeSuccessLogHistory {
  type: string;
  message: string;
  time: number;
}

interface ChargeSuccessCustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
  phone: unknown;
  metadata: unknown;
  risk_action: string;
}

interface ChargeSuccessAuthorization {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  account_name: string;
}

interface CustomerIdentificationEventData {
  customer_id: number | string;
  customer_code: string;
  email: string;
  identification: CustomerIdentification;
  reason?: string;
}

interface CustomerIdentification {
  country: string;
  type: string;
  bvn?: string;
  account_number?: string;
  bank_code?: string;
  value?: string;
}

interface DedicatedAccountAssignEventData {
  customer: DedicatedAccountCustomer;
  dedicated_account: DedicatedAccount | null;
  identification: { status: string };
}

interface DedicatedAccountCustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
  phone: string;
  metadata: unknown;
  risk_action: string;
  international_format_phone: string;
}

interface DedicatedAccount {
  bank: DedicatedAccountBank;
  account_name: string;
  account_number: string;
  assigned: boolean;
  currency: string;
  metadata: unknown;
  active: boolean;
  id: number;
  created_at: string;
  updated_at: string;
  assignment: DedicatedAccountAssignment;
}

interface DedicatedAccountBank {
  name: string;
  id: number;
  slug: string;
}

interface DedicatedAccountAssignment {
  integration: number;
  assignee_id: number;
  assignee_type: string;
  expired: boolean;
  account_type: string;
  assigned_at: string;
  expired_at: unknown;
}

interface InvoiceEventData {
  domain: Mode;
  invoice_code: string;
  amount: number;
  period_start: string;
  period_end: string;
  status: string;
  paid: boolean;
  paid_at: string | null;
  description: unknown;
  authorization: InvoiceAuthorization;
  subscription: InvoiceSubscription;
  customer: InvoiceCustomer;
  transaction: InvoiceTransaction | Empty<InvoiceTransaction>;
  created_at: string;
}

interface InvoiceAuthorization {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel?: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  reusable?: boolean;
  signature?: string;
  account_name: string;
}

interface InvoiceSubscription {
  status: string;
  subscription_code: string;
  email_token?: string;
  amount: number;
  cron_expression: string;
  next_payment_date: string;
  open_invoice: string | null;
}

interface InvoiceCustomer {
  id?: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  customer_code: string;
  phone: string | null;
  metadata: unknown;
  risk_action: string;
}

interface InvoiceTransaction {
  reference: string;
  status: string;
  amount: number;
  currency: string;
}

interface PaymentRequestEventData {
  id: number;
  domain: Mode;
  amount: number;
  currency: string;
  due_date: unknown;
  has_invoice: boolean;
  invoice_number: unknown;
  description: string;
  pdf_url: unknown;
  line_items: unknown[];
  tax: unknown[];
  request_code: string;
  status: string;
  paid: boolean;
  paid_at: string | null;
  metadata: unknown;
  notifications: PaymentRequestNotification[];
  offline_reference: string;
  customer: number;
  created_at: string;
}

interface PaymentRequestNotification {
  sent_at: string;
  channel: string;
}

interface RefundEventData {
  status: string;
  transaction_reference: string;
  refund_reference: string | null;
  amount: number | string;
  currency: string;
  processor: string;
  customer: RefundCustomer;
  integration: number;
  domain: Mode;
}

interface RefundCustomer {
  first_name: string;
  last_name: string;
  email: string;
}

interface SubscriptionEventData {
  id?: number;
  domain: Mode;
  status: string;
  subscription_code: string;
  email_token?: string;
  amount: number;
  cron_expression: string;
  next_payment_date: string | null;
  open_invoice: unknown;
  integration?: number;
  createdAt?: string;
  plan: SubscriptionPlan;
  authorization: SubscriptionAuthorization;
  customer: SubscriptionCustomer;
  invoices?: unknown[];
  invoices_history?: unknown[];
  invoice_limit?: number;
  split_code?: unknown;
  most_recent_invoice?: unknown;
  created_at: string;
}

interface SubscriptionPlan {
  id?: number;
  name: string;
  plan_code: string;
  description: string | null;
  amount: number;
  interval: string;
  send_invoices: boolean;
  send_sms: boolean;
  currency: string;
}

interface SubscriptionAuthorization {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel?: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  reusable?: boolean;
  signature?: string;
  account_name: string | null;
}

interface SubscriptionCustomer {
  id?: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  customer_code: string;
  phone: string | null;
  metadata: unknown;
  risk_action: string;
  international_format_phone?: unknown;
}

interface ExpiringCardSubscription {
  id: number;
  subscription_code: string;
  amount: number;
  next_payment_date: string;
  plan: ExpiringCardPlan;
}

interface ExpiringCardPlan {
  interval: string;
  id: number;
  name: string;
  plan_code: string;
}

interface ExpiringCardCustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  customer_code: string;
}

interface TransferEventData {
  amount: number;
  currency: string;
  domain: Mode;
  failures: unknown;
  id: number;
  integration: TransferIntegration;
  reason: string;
  reference: string;
  source: string;
  source_details: unknown;
  status: string;
  titan_code: unknown;
  transfer_code: string;
  transferred_at: string | null;
  recipient: TransferRecipient;
  session: TransferSession;
  fee_charged?: number;
  gateway_response?: unknown;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

interface TransferIntegration {
  id: number;
  is_live: boolean;
  business_name: string;
  logo_path?: string;
}

interface TransferRecipient {
  active: boolean;
  currency: string;
  description: string | null;
  domain: Mode;
  email: string | null;
  id: number;
  integration: number;
  metadata: unknown;
  name: string;
  recipient_code: string;
  type: string;
  is_deleted: boolean;
  details: TransferRecipientDetails;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
}

interface TransferRecipientDetails {
  authorization_code: unknown;
  account_number: string;
  account_name: string | null;
  bank_code: string;
  bank_name: string;
}

interface TransferSession {
  provider: string | null;
  id: string | null;
}

export interface ChargeDisputeCreateEventData extends DisputeEventData {}
export interface ChargeDisputeRemindEventData extends DisputeEventData {}
export interface ChargeDisputeResolveEventData extends DisputeEventData {}

export interface ChargeSuccessEventData {
  id: number;
  domain: Mode;
  status: string;
  reference: string;
  amount: number;
  message: unknown;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;
  ip_address: string;
  metadata: unknown;
  log: ChargeSuccessLog;
  fees: unknown;
  customer: ChargeSuccessCustomer;
  authorization: ChargeSuccessAuthorization;
  plan: Record<string, unknown>;
}

export interface CustomerIdentificationFailedEventData extends CustomerIdentificationEventData {}
export interface CustomerIdentificationSuccessEventData extends CustomerIdentificationEventData {}

export interface DedicatedAccountAssignFailedEventData extends DedicatedAccountAssignEventData {}
export interface DedicatedAccountAssignSuccessEventData extends DedicatedAccountAssignEventData {}

export interface InvoiceCreateEventData extends InvoiceEventData {}
export interface InvoicePaymentFailedEventData extends InvoiceEventData {}
export interface InvoiceUpdateEventData extends InvoiceEventData {}

export interface PaymentRequestPendingEventData extends PaymentRequestEventData {}
export interface PaymentRequestSuccessEventData extends PaymentRequestEventData {}

export interface RefundFailedEventData extends RefundEventData {}
export interface RefundPendingEventData extends RefundEventData {}
export interface RefundProcessedEventData extends RefundEventData {}
export interface RefundProcessingEventData extends RefundEventData {}

export interface SubscriptionCreateEventData extends SubscriptionEventData {}
export interface SubscriptionDisableEventData extends SubscriptionEventData {}
export interface SubscriptionNotRenewEventData extends SubscriptionEventData {}

export interface SubscriptionExpiringCardsEventDatum {
  expiry_date: string;
  description: string;
  brand: string;
  subscription: ExpiringCardSubscription;
  customer: ExpiringCardCustomer;
}

export type SubscriptionExpiringCardsEventData =
  SubscriptionExpiringCardsEventDatum[];

export interface TransferFailedEventData extends TransferEventData {}
export interface TransferSuccessEventData extends TransferEventData {}
export interface TransferReversedEventData extends TransferEventData {}

/** A dispute was logged against your business */
export interface ChargeDisputeCreateEvent {
  event: "charge.dispute.create";
  data: ChargeDisputeCreateEventData;
}

/** A logged dispute hasn't been resolved */
export interface ChargeDisputeRemindEvent {
  event: "charge.dispute.remind";
  data: ChargeDisputeRemindEventData;
}

/** A dispute has been resolved */
export interface ChargeDisputeResolveEvent {
  event: "charge.dispute.resolve";
  data: ChargeDisputeResolveEventData;
}

/** A successful charge was made */
export interface ChargeSuccessEvent {
  event: "charge.success";
  data: ChargeSuccessEventData;
}

/** A customer ID validation has failed */
export interface CustomerIdentificationFailedEvent {
  event: "customeridentification.failed";
  data: CustomerIdentificationFailedEventData;
}

/** A customer ID validation was successful */
export interface CustomerIdentificationSuccessEvent {
  event: "customeridentification.success";
  data: CustomerIdentificationSuccessEventData;
}

/** A dedicated virtual account couldn't be created and assigned to a customer */
export interface DedicatedAccountAssignFailedEvent {
  event: "dedicatedaccount.assign.failed";
  data: DedicatedAccountAssignFailedEventData;
}

/** A dedicated virtual account was created and assigned to a customer */
export interface DedicatedAccountAssignSuccessEvent {
  event: "dedicatedaccount.assign.success";
  data: DedicatedAccountAssignSuccessEventData;
}

/** An invoice has been created for a subscription, usually 3 days before it's due */
export interface InvoiceCreateEvent {
  event: "invoice.create";
  data: InvoiceCreateEventData;
}

/** A payment for an invoice failed */
export interface InvoicePaymentFailedEvent {
  event: "invoice.payment_failed";
  data: InvoicePaymentFailedEventData;
}

/** An invoice has been updated, which usually means the customer was charged */
export interface InvoiceUpdateEvent {
  event: "invoice.update";
  data: InvoiceUpdateEventData;
}

/** A payment request has been sent to a customer */
export interface PaymentRequestPendingEvent {
  event: "paymentrequest.pending";
  data: PaymentRequestPendingEventData;
}

/** A payment request has been paid for */
export interface PaymentRequestSuccessEvent {
  event: "paymentrequest.success";
  data: PaymentRequestSuccessEventData;
}

/** A refund can't be processed, and the refund amount is credited back to your account */
export interface RefundFailedEvent {
  event: "refund.failed";
  data: RefundFailedEventData;
}

/** A refund was initiated and is waiting for the processor */
export interface RefundPendingEvent {
  event: "refund.pending";
  data: RefundPendingEventData;
}

/** A refund has been processed by the processor */
export interface RefundProcessedEvent {
  event: "refund.processed";
  data: RefundProcessedEventData;
}

/** A refund has been received by the processor */
export interface RefundProcessingEvent {
  event: "refund.processing";
  data: RefundProcessingEventData;
}

/** A subscription has been created */
export interface SubscriptionCreateEvent {
  event: "subscription.create";
  data: SubscriptionCreateEventData;
}

/** A subscription on your account has been disabled */
export interface SubscriptionDisableEvent {
  event: "subscription.disable";
  data: SubscriptionDisableEventData;
}

/** Subscriptions whose cards expire this month, sent at the start of each month */
export interface SubscriptionExpiringCardsEvent {
  event: "subscription.expiring_cards";
  data: SubscriptionExpiringCardsEventData;
}

/** A subscription won't be charged on its next payment date */
export interface SubscriptionNotRenewEvent {
  event: "subscription.not_renew";
  data: SubscriptionNotRenewEventData;
}

/** A transfer you attempted has failed */
export interface TransferFailedEvent {
  event: "transfer.failed";
  data: TransferFailedEventData;
}

/** A transfer has been completed */
export interface TransferSuccessEvent {
  event: "transfer.success";
  data: TransferSuccessEventData;
}

/** A transfer you attempted has been reversed */
export interface TransferReversedEvent {
  event: "transfer.reversed";
  data: TransferReversedEventData;
}

/**
 * Every Event type this version of the package knows about. Paystack can add
 * new ones at any time, so always handle a `default` case when switching on
 * `event.event`, and acknowledge the Webhook rather than throwing.
 */
export type PaystackEvent =
  | ChargeDisputeCreateEvent
  | ChargeDisputeRemindEvent
  | ChargeDisputeResolveEvent
  | ChargeSuccessEvent
  | CustomerIdentificationFailedEvent
  | CustomerIdentificationSuccessEvent
  | DedicatedAccountAssignFailedEvent
  | DedicatedAccountAssignSuccessEvent
  | InvoiceCreateEvent
  | InvoicePaymentFailedEvent
  | InvoiceUpdateEvent
  | PaymentRequestPendingEvent
  | PaymentRequestSuccessEvent
  | RefundFailedEvent
  | RefundPendingEvent
  | RefundProcessedEvent
  | RefundProcessingEvent
  | SubscriptionCreateEvent
  | SubscriptionDisableEvent
  | SubscriptionExpiringCardsEvent
  | SubscriptionNotRenewEvent
  | TransferFailedEvent
  | TransferSuccessEvent
  | TransferReversedEvent;

export type PaystackEventType = PaystackEvent["event"];
