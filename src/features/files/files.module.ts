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
  ],
})
export class FilesModule {}
