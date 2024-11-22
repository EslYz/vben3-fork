import type {
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

type RequestContentType =
  | 'application/json;charset=utf-8'
  | 'application/octet-stream;charset=utf-8'
  | 'application/x-www-form-urlencoded;charset=utf-8'
  | 'multipart/form-data;charset=utf-8';

type RequestClientOptions = CreateAxiosDefaults;

interface HttpResR {
  message: string;
  result: string;
  sub_code: string;
  sub_message: string;
}
interface HttpPageInfo {
  currentPageNumber: number;
  currentPageSize: number;
  indexpage: number;
  pagecount: number;
  pagesize: number;
  repaging: number;
  total: number;
}

interface HttpResponse<T = any> {
  /**
   * 0 表示成功 其他表示失败
   * 0 means success, others means fail
   */
  // code: number;
  // data: T;
  // message: string;
  // l: any; unuse
  f: HttpPageInfo;
  n: T;
  r: HttpResR;
}

interface RequestInterceptorConfig {
  fulfilled?: (
    config: InternalAxiosRequestConfig,
  ) =>
    | InternalAxiosRequestConfig<any>
    | Promise<InternalAxiosRequestConfig<any>>;
  rejected?: (error: any) => any;
}

interface ResponseInterceptorConfig<T = any> {
  fulfilled?: (
    response: AxiosResponse<T>,
  ) => HttpResponse | Promise<HttpResponse>;
  rejected?: (error: any) => any;
}

type MakeErrorMessageFn = (message: string, error: any) => void;

export type {
  HttpResponse,
  MakeErrorMessageFn,
  RequestClientOptions,
  RequestContentType,
  RequestInterceptorConfig,
  ResponseInterceptorConfig,
};
