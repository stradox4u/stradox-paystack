export interface FetchHeaders {
  Authorization: string;
  Accept: string;
  'Content-Type'?: string;
}

export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface FetchData {
  method: FetchMethod;
  headers: FetchHeaders;
  body?: string;
}
