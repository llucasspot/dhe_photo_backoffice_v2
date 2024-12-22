import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';
import { SchoolsDaoPort } from '../../domain/schools-dao.port';

import { SchoolsDaoDexieAdapter } from './adapters/schools-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  imports: [DatabaseDexieModule],
  providers: [
    {
      token: SchoolsDaoPort,
      useToken: SchoolsDaoDexieAdapter,
    },
  ],
})
export class SchoolsDexieModule {}
