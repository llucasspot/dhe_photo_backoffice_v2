import { adapter, Scope } from '@mygoodstack/di-react';

import { DtoByTableName } from '../../../../../domain';
import { DaoRunTime } from '../../../../../infra/run-time';
import { SchoolsDaoPort } from '../../../domain/schools-dao.port';

@adapter(SchoolsDaoPort, Scope.Singleton, 'mock')
export class SchoolsDaoArrayAdapter
  extends DaoRunTime<DtoByTableName, 'schools'>
  implements SchoolsDaoPort
{
  constructor() {
    super([
      {
        id: '1',
        name: 'Saint Joseph High School',
        currency: 'EUR',
        city: 'Paris',
      },
      {
        id: '2',
        name: 'Lycée Victor Hugo',
        currency: 'EUR',
        city: 'Lyon',
      },
      {
        id: '3',
        name: 'International School of Marseille',
        currency: 'EUR',
        city: 'Marseille',
      },
    ]);
  }
}
