import { Module } from '#di';
import { ProjectsServicePort } from '#features/projects/domain';
import { ProjectsServiceMockAdapter } from '#features/projects/infra';

@Module({
  providers: [
    {
      token: ProjectsServicePort,
      useToken: ProjectsServiceMockAdapter,
    },
  ],
})
export class ProjectsModule {}
