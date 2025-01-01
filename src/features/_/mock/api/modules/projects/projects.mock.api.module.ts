import { ProjectsServiceMockAdapter } from './infra/projects.service.mock-adapter';

import { Module } from '#di';

@Module({
  providers: [ProjectsServiceMockAdapter],
})
export class ProjectsMockApiModule {}
