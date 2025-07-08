import { Module } from '@mygoodstack/di-react';

import { ProjectsServiceMockAdapter } from './infra/projects.service.mock-adapter';

@Module({
  providers: [ProjectsServiceMockAdapter],
})
export class ProjectsMockApiModule {}
