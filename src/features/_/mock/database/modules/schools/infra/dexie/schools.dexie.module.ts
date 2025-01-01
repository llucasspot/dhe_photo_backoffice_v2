import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { SchoolsDaoDexieAdapter } from './adapters/schools-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  imports: [DatabaseDexieModule],
  providers: [SchoolsDaoDexieAdapter],
})
export class SchoolsDexieModule {}
