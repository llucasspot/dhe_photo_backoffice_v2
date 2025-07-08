import { RequestMiddleware } from '../axios-instance.builder';

import { LocalGetter } from '#action/domain';

export const setAuthorizationHeaderRequestMiddleware = (
  authorizationGetter?: LocalGetter<
    | `Bearer ${string}`
    | `Basic ${string}`
    | Promise<`Bearer ${string}`>
    | Promise<`Basic ${string}`>
  >,
): RequestMiddleware => [
  async (config) => {
    if (authorizationGetter) {
      config.headers['Authorization'] = await authorizationGetter.get();
    }
    return config;
  },
];
