import { adapter, inject, Scope } from '@mygoodstack/di-react';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { BankAccountsDaoPort } from '../../../domain/bank-accounts-dao.port';

@adapter(BankAccountsDaoPort, Scope.Singleton, 'mock')
export class BankAccountsDaoDexieAdapter
  extends DaoDexie<'bankAccounts'>
  implements BankAccountsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'bankAccounts');
  }
}
