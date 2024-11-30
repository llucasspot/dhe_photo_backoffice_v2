import { Module } from '#di';
import { SchoolsServiceControllerServicePort } from '#features/schools/domain';
import { SchoolsServiceMockAdapter } from '#features/schools/infra';

@Module({
  providers: [
    {
      token: SchoolsServiceControllerServicePort,
      useToken: SchoolsServiceMockAdapter,
    },
  ],
})
export class SchoolsMockModule {}
