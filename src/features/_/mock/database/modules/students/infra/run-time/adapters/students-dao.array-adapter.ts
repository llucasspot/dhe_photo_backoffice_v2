import { adapter } from '@mygoodstack/di-react';

import { DtoByTableName } from '../../../../../domain';
import { DaoRunTime } from '../../../../../infra/run-time';
import { StudentsDaoPort } from '../../../domain/students-dao.port';

@adapter(StudentsDaoPort, Scope.Singleton, 'mock')
export class StudentsDaoArrayAdapter
  extends DaoRunTime<DtoByTableName, 'students'>
  implements StudentsDaoPort
{
  constructor() {
    super([]);
  }
}
