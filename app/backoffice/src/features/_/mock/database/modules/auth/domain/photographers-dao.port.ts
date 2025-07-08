import { Dao, DtoByTableName } from '../../../domain';

export abstract class PhotographersDaoPort extends Dao<
  DtoByTableName,
  'photographers'
> {}
