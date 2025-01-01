import { StudentsDaoArrayAdapter } from './adapters/students-dao.array-adapter';

import { Module } from '#di';

@Module({
  providers: [StudentsDaoArrayAdapter],
})
export class StudentsRunTimeModule {}
