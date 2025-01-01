import { SchoolsDaoArrayAdapter } from './adapters/schools-dao.array-adapter';

import { Module } from '#di';

@Module({
  providers: [SchoolsDaoArrayAdapter],
})
export class SchoolsRunTimeModule {}
