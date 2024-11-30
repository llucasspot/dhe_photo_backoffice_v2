import { PictureControllerServicePort } from './domain/picture.controller-service.port.ts';
import { PictureControllerServiceDexieAdapter } from './infra/mock/picture.controller-service.dexie-adapter.ts';
import { FilesCreatorControllerServicePort } from './domain';
import { FilesServiceMockAdapter } from './infra';

import { Module } from '#di';
import { FileStudentsCreatorControllerServicePort } from '#features/files/domain';
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
