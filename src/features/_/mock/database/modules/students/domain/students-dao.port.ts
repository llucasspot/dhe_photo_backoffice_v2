import { Dao, DtoByTableName } from '../../../domain';

export abstract class StudentsDaoPort extends Dao<DtoByTableName, 'students'> {}
