import { Dto } from '#core/domain';
import { AvailableCurrency } from '#features/schools/domain';
import { Dao } from '#mock';

export class School extends Dto<School> {
  id!: string;
  name!: string;
  currency!: AvailableCurrency;
  city!: string;
}

export abstract class SchoolsDaoPort extends Dao<'schools'> {}
