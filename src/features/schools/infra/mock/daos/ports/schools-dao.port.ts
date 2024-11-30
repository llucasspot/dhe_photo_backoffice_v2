import { Dao, DtoByTableName } from '#mock/domain';

export abstract class SchoolsDaoPort extends Dao<DtoByTableName, 'schools'> {}
