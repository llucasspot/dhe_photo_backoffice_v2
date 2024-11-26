import { Module } from '#di';
import { ProjectsControllerServicePort } from '#features/projects/domain';
import { ProjectsServiceMockAdapter } from '#features/projects/infra';

@Module({
  providers: [
    {
      token: ProjectsControllerServicePort,
      useToken: ProjectsServiceMockAdapter,
    },
  ],
})
export class ProjectsModule {}
