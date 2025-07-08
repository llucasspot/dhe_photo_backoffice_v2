import { Module } from '@mygoodstack/di-react';

import { ProjectsDaoArrayAdapter } from './adapters/projects-dao.array-adapter';

@Module({
  providers: [ProjectsDaoArrayAdapter],
})
export class ProjectsRunTimeModule {}
