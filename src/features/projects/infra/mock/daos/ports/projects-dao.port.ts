import { Dao, DtoByTableName } from '#mock/domain';

export abstract class ProjectsDaoPort extends Dao<DtoByTableName, 'projects'> {}
