import { QueryClient } from '@tanstack/react-query';

import { HttpError } from '../mock/api/domain/http-error.ts';

import { CacheServiceReactQueryAdapter } from './infra/cache.service.react-query-adapter';

import { CacheServicePort } from '#cache/domain';
import { Module } from '#di';

@Module({
  providers: [
    {
      token: QueryClient,
      useValue: new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 60, // 1 hour
            retry: (failureCount, error) => {
              if ((<HttpError>error).status) {
                return false;
              }
              return failureCount < 3;
            },
          },
        },
      }),
    },
    {
      token: CacheServicePort,
      useToken: CacheServiceReactQueryAdapter,
    },
  ],
})
export class CacheModule {}
