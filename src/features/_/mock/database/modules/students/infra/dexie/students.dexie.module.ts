import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { StudentsDaoDexieAdapter } from './adapters/students-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  imports: [DatabaseDexieModule],
  providers: [StudentsDaoDexieAdapter],
})
export class StudentsDexieModule {}
