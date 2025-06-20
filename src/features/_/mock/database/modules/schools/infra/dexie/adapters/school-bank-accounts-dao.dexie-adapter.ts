import { adapter, inject, Scope } from '@mygoodstack/di-react';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { SchoolBankAccountsDaoPort } from '../../../domain/school-bank-accounts-dao.port';

@adapter(SchoolBankAccountsDaoPort, Scope.Singleton, 'mock')
export class SchoolBankAccountsDaoDexieAdapter
  extends DaoDexie<'schoolBankAccounts'>
  implements SchoolBankAccountsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'schoolBankAccounts');
  }
}
