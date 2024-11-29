export interface PaystackResponseInterface<T, S = undefined> {
  status: boolean;
  message: string;
  data: T;
  meta?: S;
}