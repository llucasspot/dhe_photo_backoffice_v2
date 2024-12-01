import { FilesCreatorControllerServicePort } from './domain';
import { FilesServiceMockAdapter } from './infra';

import { Module } from '#di';
import { PictureControllerServicePort } from '#features/files/domain';
import { FileStudentsCreatorControllerServicePort } from '#features/files/domain';
import { PictureControllerServiceDexieAdapter } from '#features/files/infra';
import { FileStudentsServiceMockAdapter } from '#features/files/infra';

@Module({
  providers: [
    {
      token: FilesCreatorControllerServicePort,
      useToken: FilesServiceMockAdapter,
    },
    {
      token: FileStudentsCreatorControllerServicePort,
      useToken: FileStudentsServiceMockAdapter,
    },
    {
      token: PictureControllerServicePort,
      useToken: PictureControllerServiceDexieAdapter,
    },
  ],
})
export class FilesMockModule {}
