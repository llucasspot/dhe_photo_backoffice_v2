import { Module } from '@mygoodstack/di-react/dist';

import { StudentsDaoArrayAdapter } from './adapters/students-dao.array-adapter';

@Module({
  providers: [StudentsDaoArrayAdapter],
})
export class StudentsRunTimeModule {}
