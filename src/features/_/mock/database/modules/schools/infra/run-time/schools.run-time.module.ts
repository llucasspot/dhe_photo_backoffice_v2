import { Module } from '@mygoodstack/di-react/dist';

import { SchoolsDaoArrayAdapter } from './adapters/schools-dao.array-adapter';

@Module({
  providers: [SchoolsDaoArrayAdapter],
})
export class SchoolsRunTimeModule {}
