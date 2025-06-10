import { ProjectsServiceApiAdapter } from './infra/projects.service.api-adapter';

import { Module } from '#di';

@Module({
  providers: [ProjectsServiceApiAdapter],
})
export class ProjectsHttpApiModule {}
