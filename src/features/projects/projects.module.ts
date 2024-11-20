import { ProjectsServiceMockAdapter } from './infra/services';

import { Module } from '#di';
import { ProjectsServicePort } from '#features/projects/domain';

@Module({
  providers: [
    {
      token: ProjectsServicePort,
      useClass: ProjectsServiceMockAdapter,
    },
  ],
})
export class ProjectsModule {}
