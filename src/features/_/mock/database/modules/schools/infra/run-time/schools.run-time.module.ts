import { Module } from '@mygoodstack/di-react';

import { SchoolsDaoArrayAdapter } from './adapters/schools-dao.array-adapter';

@Module({
  providers: [SchoolsDaoArrayAdapter],
})
export class SchoolsRunTimeModule {}
