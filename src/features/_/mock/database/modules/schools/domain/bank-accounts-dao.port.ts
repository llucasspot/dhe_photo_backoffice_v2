import { Dao, DtoByTableName } from '../../../domain';

export abstract class BankAccountsDaoPort extends Dao<
  DtoByTableName,
  'bankAccounts'
> {}
