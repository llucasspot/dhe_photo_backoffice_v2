import { Dao, DtoByTableName } from '../../../domain';

export abstract class ProjectsDaoPort extends Dao<DtoByTableName, 'projects'> {}
