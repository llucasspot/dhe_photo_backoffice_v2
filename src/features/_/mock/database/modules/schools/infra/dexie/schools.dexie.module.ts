import { Module } from '@mygoodstack/di-react/dist';

import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { BankAccountsDaoDexieAdapter } from './adapters/bank-accounts-dao.dexie-adapter';
import { SchoolBankAccountsDaoDexieAdapter } from './adapters/school-bank-accounts-dao.dexie-adapter';
import { SchoolsDaoDexieAdapter } from './adapters/schools-dao.dexie-adapter';

@Module({
  providers: [
    DatabaseDexieModule,
    SchoolsDaoDexieAdapter,
    BankAccountsDaoDexieAdapter,
    SchoolBankAccountsDaoDexieAdapter,
  ],
})
export class SchoolsDexieModule {}
