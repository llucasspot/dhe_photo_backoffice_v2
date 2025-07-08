import { Module } from '@mygoodstack/di-react';

import { ProjectsServiceApiAdapter } from './infra/projects.service.api-adapter';

@Module({
  providers: [ProjectsServiceApiAdapter],
})
export class ProjectsHttpApiModule {}
