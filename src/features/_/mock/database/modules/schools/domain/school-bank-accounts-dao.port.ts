import { Dao, DtoByTableName } from '../../../domain';

export abstract class SchoolBankAccountsDaoPort extends Dao<
  DtoByTableName,
  'schoolBankAccounts'
> {}
