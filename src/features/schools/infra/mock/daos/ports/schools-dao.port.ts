import { SchoolDto } from '#features/schools/domain';
import { Dao } from '#mock';

export abstract class SchoolsDaoPort extends Dao<Omit<SchoolDto, ''>> {}
