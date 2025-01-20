import { ProjectsServiceApiAdapter } from './infra/projects.service.api-adapter.ts';

import { Module } from '#di';

@Module({
  providers: [ProjectsServiceApiAdapter],
})
export class ProjectsHttpApiModule {}
