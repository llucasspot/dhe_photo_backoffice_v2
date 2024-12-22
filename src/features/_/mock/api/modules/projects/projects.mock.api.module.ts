import { ProjectsServiceMockAdapter } from './infra/projects.service.mock-adapter';

import { Module } from '#di';
import { ProjectsControllerServicePort } from '#features/projects/domain';

@Module({
  providers: [
    {
      token: ProjectsControllerServicePort,
      useToken: ProjectsServiceMockAdapter,
    },
  ],
})
export class ProjectsMockApiModule {}
