import { SchoolsServiceMockAdapter } from './infra/schools.service.mock-adapter';

import { Module } from '#di';

@Module({
  providers: [SchoolsServiceMockAdapter],
})
export class SchoolsMockApiModule {}
