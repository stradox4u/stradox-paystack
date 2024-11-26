export interface PaystackResponseInterface<T> {
  status: boolean;
  message: string;
  data: T;
}