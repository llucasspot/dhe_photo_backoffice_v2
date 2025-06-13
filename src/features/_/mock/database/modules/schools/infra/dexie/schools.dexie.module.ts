import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { BankAccountsDaoDexieAdapter } from './adapters/bank-accounts-dao.dexie-adapter';
import { SchoolBankAccountsDaoDexieAdapter } from './adapters/school-bank-accounts-dao.dexie-adapter';
import { SchoolsDaoDexieAdapter } from './adapters/schools-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  imports: [DatabaseDexieModule],
  providers: [
    SchoolsDaoDexieAdapter,
    BankAccountsDaoDexieAdapter,
    SchoolBankAccountsDaoDexieAdapter,
  ],
})
export class SchoolsDexieModule {}
