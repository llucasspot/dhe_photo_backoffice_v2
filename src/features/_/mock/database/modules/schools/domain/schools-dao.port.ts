import { Dao, DtoByTableName } from '../../../domain';

export abstract class SchoolsDaoPort extends Dao<DtoByTableName, 'schools'> {}
