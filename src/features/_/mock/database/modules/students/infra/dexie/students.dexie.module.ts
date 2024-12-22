import { StudentsDaoPort } from '../../domain/students-dao.port';

import { StudentsDaoDexieAdapter } from './adapters/students-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  providers: [
    {
      token: StudentsDaoPort,
      useToken: StudentsDaoDexieAdapter,
    },
  ],
})
export class StudentsDexieModule {}
