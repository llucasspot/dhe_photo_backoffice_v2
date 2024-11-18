import { Module } from '#di';
import { RoutingServicePort } from '#routing/domain';
import { RoutingServiceTanstackAdapter } from '#routing/infra';

@Module({
  imports: [],
  providers: [
    {
      token: RoutingServiceTanstackAdapter,
      useClass: RoutingServiceTanstackAdapter,
    },
    {
      token: RoutingServicePort,
      useToken: RoutingServiceTanstackAdapter,
    },
  ],
})
export class RoutingModule {}
