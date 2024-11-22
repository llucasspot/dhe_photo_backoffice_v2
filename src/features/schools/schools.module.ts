import { Module } from '#di';
import { SchoolsServicePort } from '#features/schools/domain';
import { SchoolsServiceMockAdapter } from '#features/schools/infra';

@Module({
  providers: [
    {
      token: SchoolsServicePort,
      useToken: SchoolsServiceMockAdapter,
    },
  ],
})
export class SchoolsModule {}
