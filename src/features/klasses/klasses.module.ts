import { Module } from '#di';
import { KlassesControllerServicePort } from '#features/klasses/domain';
import { KlassesServiceMockAdapter } from '#features/klasses/infra';

@Module({
  providers: [
    {
      token: KlassesControllerServicePort,
      useToken: KlassesServiceMockAdapter,
    },
  ],
})
export class KlassesModule {}
