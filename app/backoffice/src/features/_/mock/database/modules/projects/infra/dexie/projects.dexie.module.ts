import { Module } from '@mygoodstack/di-react';

import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { ProjectsDaoDexieAdapter } from './adapters/projects-dao.dexie-adapter';

@Module({
  providers: [DatabaseDexieModule, ProjectsDaoDexieAdapter],
})
export class ProjectsDexieModule {}
