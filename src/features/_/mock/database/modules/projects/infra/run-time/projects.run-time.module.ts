import { ProjectsDaoPort } from '../../domain/projects-dao.port';

import { ProjectsDaoArrayAdapter } from './adapters/projects-dao.array-adapter';

import { Module } from '#di';

@Module({
  providers: [
    {
      token: ProjectsDaoPort,
      useToken: ProjectsDaoArrayAdapter,
    },
  ],
})
export class ProjectsRunTimeModule {}
