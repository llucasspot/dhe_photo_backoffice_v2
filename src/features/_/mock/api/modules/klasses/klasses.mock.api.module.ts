import { KlassesServiceMockAdapter } from './infra/klasses.service.mock-adapter';

import { Module } from '#di';
import { KlassesControllerServicePort } from '#features/klasses/domain';

@Module({
  providers: [
    {
      token: KlassesControllerServicePort,
      useToken: KlassesServiceMockAdapter,
    },
  ],
})
export class KlassesMockApiModule {}
