import { Module } from '@mygoodstack/di-react';

import { StudentsDaoArrayAdapter } from './adapters/students-dao.array-adapter';

@Module({
  providers: [StudentsDaoArrayAdapter],
})
export class StudentsRunTimeModule {}
