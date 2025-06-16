import { Module } from '@mygoodstack/di-react/dist';

import { KlassesServiceMockAdapter } from './infra/klasses.service.mock-adapter';

@Module({
  providers: [KlassesServiceMockAdapter],
})
export class KlassesMockApiModule {}
