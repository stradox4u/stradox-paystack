export interface PaystackResponseInterface {
  status: boolean;
  message: string;
  data: Record<string, unknown>;
}