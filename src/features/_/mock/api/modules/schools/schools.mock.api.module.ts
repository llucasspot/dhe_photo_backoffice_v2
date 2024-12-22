import { SchoolsServiceMockAdapter } from './infra/schools.service.mock-adapter';

import { Module } from '#di';
import { SchoolsServiceControllerServicePort } from '#features/schools/domain';

@Module({
  providers: [
    {
      token: SchoolsServiceControllerServicePort,
      useToken: SchoolsServiceMockAdapter,
    },
  ],
})
export class SchoolsMockApiModule {}
