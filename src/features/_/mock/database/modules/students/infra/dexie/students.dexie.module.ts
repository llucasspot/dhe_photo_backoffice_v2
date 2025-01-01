import { StudentsDaoDexieAdapter } from './adapters/students-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  providers: [StudentsDaoDexieAdapter],
})
export class StudentsDexieModule {}
