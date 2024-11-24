import { Module } from '#di';
import { SchoolsServicePort } from '#features/schools/domain';
import { SchoolsDaoDexieAdapter } from '#features/schools/infra';
import {
  SchoolsDaoPort,
  SchoolsServiceMockAdapter,
} from '#features/schools/infra';

@Module({
  providers: [
    {
      token: SchoolsServicePort,
      useToken: SchoolsServiceMockAdapter,
    },
    {
      token: SchoolsDaoPort,
      useToken: SchoolsDaoDexieAdapter,
    },
  ],
})
export class SchoolsModule {}
