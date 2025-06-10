import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { ProjectsDaoDexieAdapter } from './adapters/projects-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  imports: [DatabaseDexieModule],
  providers: [ProjectsDaoDexieAdapter],
})
export class ProjectsDexieModule {}
