import { ProjectsDaoPort } from '../../domain/projects-dao.port';

import { ProjectsDaoDexieAdapter } from './adapters/projects-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  providers: [
    {
      token: ProjectsDaoPort,
      useToken: ProjectsDaoDexieAdapter,
    },
  ],
})
export class ProjectsDexieModule {}
