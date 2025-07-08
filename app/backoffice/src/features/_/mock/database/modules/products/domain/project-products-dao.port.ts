import { Dao, DtoByTableName } from '../../../domain';

export abstract class ProjectProductsDaoPort extends Dao<
  DtoByTableName,
  'projectProducts'
> {}
