import { singleton } from '@mygoodstack/di-react';
import { QueryClient } from '@tanstack/react-query';

import { HttpError } from './_/mock/api/domain/http-error';

@singleton()
export class QueryClientGetter {
  private readonly queryClient = new QueryClient({
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
  });

  get() {
    return this.queryClient;
  }
}
