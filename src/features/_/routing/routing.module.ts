import { RoutingServiceTanstackAdapter } from './infra';

import { Module } from '#di';
import { RoutingServicePort } from '#routing/domain';

@Module({
  imports: [],
  providers: [
    {
      token: RoutingServicePort,
      useToken: RoutingServiceTanstackAdapter,
    },
  ],
})
export class RoutingModule {}
