import { Dao, DtoByTableName } from '#mock/domain';

export abstract class ProjectProductsDaoPort extends Dao<
  DtoByTableName,
  'projectProducts'
> {}
