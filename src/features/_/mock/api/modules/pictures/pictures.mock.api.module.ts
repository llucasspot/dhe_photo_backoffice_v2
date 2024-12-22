import { FileStudentsServiceMockAdapter } from './infra/file-students.service.mock-adapter';
import { FilesServiceMockAdapter } from './infra/files.service.mock-adapter';
import { GroupPicturesServiceMockAdapter } from './infra/group-pictures.service.mock-adapter';
import { PictureControllerServiceDexieAdapter } from './infra/picture.controller-service.dexie-adapter';

import { Module } from '#di';
import {
  FilesCreatorControllerServicePort,
  FileStudentsCreatorControllerServicePort,
  PictureControllerServicePort,
} from '#features/files/domain';
import { GroupPicturesCreatorControllerServicePort } from '#features/klasses/domain';

@Module({
  providers: [
    {
      token: GroupPicturesCreatorControllerServicePort,
      useToken: GroupPicturesServiceMockAdapter,
    },
    {
      token: FileStudentsCreatorControllerServicePort,
      useToken: FileStudentsServiceMockAdapter,
    },
    {
      token: FilesCreatorControllerServicePort,
      useToken: FilesServiceMockAdapter,
    },
    {
      token: PictureControllerServicePort,
      useToken: PictureControllerServiceDexieAdapter,
    },
  ],
})
export class PicturesMockApiModule {}
