import { Module } from '@mygoodstack/di-react';

import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { StudentsDaoDexieAdapter } from './adapters/students-dao.dexie-adapter';

@Module({
  providers: [DatabaseDexieModule, StudentsDaoDexieAdapter],
})
export class StudentsDexieModule {}
