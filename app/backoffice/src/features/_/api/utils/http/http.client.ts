import { inject, singleton } from '@mygoodstack/di-react';

import { HttpAxiosClient } from './axios/http-axios.client';
import { AuthorizationBearerGetter } from './authorization-bearer.getter';

import { ConsoleLogger } from '#core/domain';

@singleton()
export class HttpClient extends HttpAxiosClient {
  constructor(
    @inject(AuthorizationBearerGetter)
    authorizationBearerGetter: AuthorizationBearerGetter,
  ) {
    const logger = new ConsoleLogger('HttpClient');
    super(
      logger,
      {
        baseURL: 'http://localhost:3000/api/',
      },
      authorizationBearerGetter,
    );
  }
}
