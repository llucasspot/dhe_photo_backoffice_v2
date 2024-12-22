import { SchoolsDaoPort } from '../../domain/schools-dao.port';

import { SchoolsDaoArrayAdapter } from './adapters/schools-dao.array-adapter';

import { Module } from '#di';

@Module({
  providers: [
    {
      token: SchoolsDaoPort,
      useToken: SchoolsDaoArrayAdapter,
    },
  ],
})
export class SchoolsRunTimeModule {}
