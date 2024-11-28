import { GroupPicturesServiceMockAdapter } from './infra/mock/group-pictures.service.mock-adapter';

import { Module } from '#di';
import {
  GroupPicturesCreatorControllerServicePort,
  KlassesControllerServicePort,
} from '#features/klasses/domain';
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
export class KlassesModule {}
