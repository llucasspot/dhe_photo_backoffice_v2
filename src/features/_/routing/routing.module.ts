import { Module } from '@mygoodstack/di-react/dist';

import { RoutingServiceTanstackAdapter } from './infra';

@Module({
  providers: [RoutingServiceTanstackAdapter],
})
export class RoutingModule {}
