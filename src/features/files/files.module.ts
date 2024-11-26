import { FilesServicePort } from './domain';
import { FilesServiceMockAdapter } from './infra';

import { Module } from '#di';
import { FileStudentsServicePort } from '#features/files/domain';
import { FileStudentsServiceMockAdapter } from '#features/files/infra';

@Module({
  providers: [
    {
      token: FilesServicePort,
      useToken: FilesServiceMockAdapter,
    },
    {
      token: FileStudentsServicePort,
      useToken: FileStudentsServiceMockAdapter,
    },
  ],
})
export class FilesModule {}
