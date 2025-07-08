import { Module } from '@mygoodstack/di-react';

import { RoutingServiceTanstackAdapter } from './infra';

@Module({
  providers: [RoutingServiceTanstackAdapter],
})
export class RoutingModule {}
