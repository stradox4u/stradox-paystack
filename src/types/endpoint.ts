export interface FetchHeaders {
  Authorization: string;
  Accept: string;
  'Content-Type'?: string;
}


export interface FetchData {
  method: string;
  headers: FetchHeaders;
  body?: string;
}
