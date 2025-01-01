import { KlassesServiceMockAdapter } from './infra/klasses.service.mock-adapter';

import { Module } from '#di';

@Module({
  providers: [KlassesServiceMockAdapter],
})
export class KlassesMockApiModule {}
