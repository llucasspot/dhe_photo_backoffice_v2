import { Module } from '@mygoodstack/di-react';

import { SchoolsServiceMockAdapter } from './infra/schools.service.mock-adapter';

@Module({
  providers: [SchoolsServiceMockAdapter],
})
export class SchoolsMockApiModule {}
