import { Module } from '@mygoodstack/di-react/dist';

import { SchoolsServiceMockAdapter } from './infra/schools.service.mock-adapter';

@Module({
  providers: [SchoolsServiceMockAdapter],
})
export class SchoolsMockApiModule {}
