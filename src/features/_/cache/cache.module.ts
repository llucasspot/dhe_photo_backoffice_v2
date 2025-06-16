import { Module } from '@mygoodstack/di-react/dist';

import { CacheServiceReactQueryAdapter } from './infra/cache.service.react-query-adapter.ts';

@Module({
  providers: [CacheServiceReactQueryAdapter],
})
export class CacheModule {}
