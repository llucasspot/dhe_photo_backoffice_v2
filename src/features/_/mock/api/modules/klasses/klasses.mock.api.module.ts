import { Module } from '@mygoodstack/di-react';

import { KlassesServiceMockAdapter } from './infra/klasses.service.mock-adapter';

@Module({
  providers: [KlassesServiceMockAdapter],
})
export class KlassesMockApiModule {}
