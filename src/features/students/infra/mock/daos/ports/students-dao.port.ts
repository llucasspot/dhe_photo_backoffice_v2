import { Dao, DtoByTableName } from '#mock/domain';

export abstract class StudentsDaoPort extends Dao<DtoByTableName, 'students'> {}
