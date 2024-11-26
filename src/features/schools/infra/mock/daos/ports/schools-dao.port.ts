import { SchoolDto } from '#features/schools/domain';
import { Dao } from '#mock';

export type School = Pick<SchoolDto, 'id' | 'name' | 'currency' | 'city'>;

export abstract class SchoolsDaoPort extends Dao<'schools'> {}
