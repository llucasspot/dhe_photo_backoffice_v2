import { Model } from '@domain/core';

import { AvailableCurrency } from './available-currency.enum';

export class SchoolModel extends Model<SchoolModel> {
  name!: string;
  currency!: AvailableCurrency;
}
