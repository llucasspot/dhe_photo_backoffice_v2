import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { BankAccountsDaoPort } from '../../../domain/bank-accounts-dao.port';

import { adapter, inject } from '#di';

@adapter(BankAccountsDaoPort, ['mock'])
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
