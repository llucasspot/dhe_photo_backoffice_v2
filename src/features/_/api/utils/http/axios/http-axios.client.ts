import { singleton } from '@mygoodstack/di-react';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { logDataRequestMiddleware } from './middlewares/log-data-request-middleware';
import { logDataResponseMiddleware } from './middlewares/log-data-response-middleware';
import { setAuthorizationHeaderRequestMiddleware } from './middlewares/set-authorization-header-request.middleware';
import { setRequestIdRequestMiddleware } from './middlewares/set-request-id-reques.middleware';
import type { AxiosAbstractOptions } from './axios-instance.builder';
import { AxiosInstanceBuilder } from './axios-instance.builder';

import { LocalGetter } from '#action/domain';
import { LoggerI } from '#core/domain';

@singleton()
export class HttpAxiosClient {
  private readonly client: AxiosInstance;

  constructor(
    protected readonly logger: LoggerI,
    options: AxiosAbstractOptions,
    authorizationGetter?: LocalGetter<
      | `Bearer ${string}`
      | `Basic ${string}`
      | Promise<`Bearer ${string}`>
      | Promise<`Basic ${string}`>
    >,
  ) {
    this.client = new AxiosInstanceBuilder()
      .addRequestMiddleware(setRequestIdRequestMiddleware)
      .addRequestMiddleware(logDataRequestMiddleware(this.logger))
      .addRequestMiddleware(
        setAuthorizationHeaderRequestMiddleware(authorizationGetter),
      )
      .addResponseMiddleware(logDataResponseMiddleware(this.logger))
      .build(options);
  }

  get<T = never, R = AxiosResponse<T>, D = never>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.get<T, R, D>(url, config);
  }

  delete<T = never, R = AxiosResponse<T>, D = never>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.delete<T, R, D>(url, config);
  }

  head<T = never, R = AxiosResponse<T>, D = never>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.head<T, R, D>(url, config);
  }

  options<T = never, R = AxiosResponse<T>, D = never>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.options<T, R, D>(url, config);
  }

  post<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.post<T, R, D>(url, data, config);
  }

  put<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.put<T, R, D>(url, data, config);
  }

  patch<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.patch<T, R, D>(url, data, config);
  }

  postForm<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.postForm<T, R, D>(url, data, config);
  }

  putForm<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.putForm<T, R, D>(url, data, config);
  }

  patchForm<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.client.patchForm<T, R, D>(url, data, config);
  }
}
