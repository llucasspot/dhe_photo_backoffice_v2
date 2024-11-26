import { FilesServicePort } from './domain';
import {
  FilesDaoDexieAdapter,
  FilesDaoPort,
  FilesServiceMockAdapter,
} from './infra';

import { Module } from '#di';
import { FileStudentsServicePort } from '#features/files/domain';
import { FileStudentsDaoDexieAdapter } from '#features/files/infra';
import { FileStudentsDaoPort } from '#features/files/infra';
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
    {
      token: FilesDaoPort,
      useToken: FilesDaoDexieAdapter,
    },
    {
      token: FileStudentsDaoPort,
      useToken: FileStudentsDaoDexieAdapter,
    },
  ],
})
export class FilesModule {}
