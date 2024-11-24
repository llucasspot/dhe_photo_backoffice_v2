import { Module } from '#di';
import { KlassesServicePort } from '#features/klasses/domain';
import {
  KlassesDaoDexieAdapter,
  KlassesDaoPort,
  KlassesServiceMockAdapter,
} from '#features/klasses/infra';

@Module({
  providers: [
    {
      token: KlassesServicePort,
      useToken: KlassesServiceMockAdapter,
    },
    {
      token: KlassesDaoPort,
      useToken: KlassesDaoDexieAdapter,
    },
  ],
})
export class KlassesModule {}
