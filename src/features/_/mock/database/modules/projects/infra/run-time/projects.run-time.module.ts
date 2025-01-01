import { ProjectsDaoArrayAdapter } from './adapters/projects-dao.array-adapter';

import { Module } from '#di';

@Module({
  providers: [ProjectsDaoArrayAdapter],
})
export class ProjectsRunTimeModule {}
