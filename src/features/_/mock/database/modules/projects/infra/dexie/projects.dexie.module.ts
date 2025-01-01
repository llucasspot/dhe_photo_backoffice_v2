import { ProjectsDaoDexieAdapter } from './adapters/projects-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  providers: [ProjectsDaoDexieAdapter],
})
export class ProjectsDexieModule {}
