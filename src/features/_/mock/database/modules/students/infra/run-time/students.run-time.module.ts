import { StudentsDaoPort } from '../../domain/students-dao.port';

import { StudentsDaoArrayAdapter } from './adapters/students-dao.array-adapter';

import { Module } from '#di';

@Module({
  providers: [
    {
      token: StudentsDaoPort,
      useToken: StudentsDaoArrayAdapter,
    },
  ],
})
export class StudentsRunTimeModule {}
