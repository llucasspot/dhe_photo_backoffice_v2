import { Module } from '#di';
import { KlassesServicePort } from '#features/klasses/domain';
import { KlassesServiceMockAdapter } from '#features/klasses/infra';

@Module({
  providers: [
    {
      token: KlassesServicePort,
      useToken: KlassesServiceMockAdapter,
    },
  ],
})
export class KlassesModule {}
