import { Module } from '#di';
import {
  GroupPicturesCreatorControllerServicePort,
  KlassesControllerServicePort,
} from '#features/klasses/domain';
import { GroupPicturesServiceMockAdapter } from '#features/klasses/infra';
import { KlassesServiceMockAdapter } from '#features/klasses/infra';

@Module({
  providers: [
    {
      token: KlassesControllerServicePort,
      useToken: KlassesServiceMockAdapter,
    },
    {
      token: GroupPicturesCreatorControllerServicePort,
      useToken: GroupPicturesServiceMockAdapter,
    },
  ],
})
export class KlassesMockModule {}
