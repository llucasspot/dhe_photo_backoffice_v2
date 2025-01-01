import { RoutingServiceTanstackAdapter } from './infra';

import { Module } from '#di';

@Module({
  imports: [],
  providers: [RoutingServiceTanstackAdapter],
})
export class RoutingModule {}
