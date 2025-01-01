import { DtoByTableName } from '../../../../../domain';
import { DaoRunTime } from '../../../../../infra/run-time';
import { SchoolsDaoPort } from '../../../domain/schools-dao.port';

import { adapter } from '#di';
import { AvailableCurrency } from '#features/schools/domain';

@adapter(SchoolsDaoPort)
export class SchoolsDaoArrayAdapter
  extends DaoRunTime<DtoByTableName, 'schools'>
  implements SchoolsDaoPort
{
  constructor() {
    super([
      {
        id: '1',
        name: 'Saint Joseph High School',
        currency: AvailableCurrency.EUR,
        city: 'Paris',
      },
      {
        id: '2',
        name: 'Lycée Victor Hugo',
        currency: AvailableCurrency.EUR,
        city: 'Lyon',
      },
      {
        id: '3',
        name: 'International School of Marseille',
        currency: AvailableCurrency.EUR,
        city: 'Marseille',
      },
    ]);
  }
}
