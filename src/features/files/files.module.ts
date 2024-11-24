import { FilesServicePort } from './domain';
import {
  FilesDaoDexieAdapter,
  FilesDaoPort,
  FilesServiceMockAdapter,
} from './infra';

import { Module } from '#di';

@Module({
  providers: [
    {
      token: FilesServicePort,
      useToken: FilesServiceMockAdapter,
    },
    {
      token: FilesDaoPort,
      useToken: FilesDaoDexieAdapter,
    },
  ],
})
export class FilesModule {}
