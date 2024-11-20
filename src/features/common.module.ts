import { QueryClient } from '@tanstack/react-query';

import { I18nModule } from './_/i18n/i18n.module';

import { Module } from '#di';
import { RoutingModule } from '#routing';

@Module({
  imports: [RoutingModule, I18nModule],
  providers: [
    {
      token: QueryClient,
      useValue: new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 60, // 1 hour
          },
        },
      }),
    },
  ],
})
export class CommonModule {}
