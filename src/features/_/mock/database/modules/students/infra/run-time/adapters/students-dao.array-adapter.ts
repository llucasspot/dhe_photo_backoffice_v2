import { DtoByTableName } from '../../../../../domain';
import { DaoRunTime } from '../../../../../infra/run-time';
import { StudentsDaoPort } from '../../../domain/students-dao.port';

import { adapter } from '#di';

@adapter(StudentsDaoPort, ['mock'])
export class StudentsDaoArrayAdapter
  extends DaoRunTime<DtoByTableName, 'students'>
  implements StudentsDaoPort
{
  constructor() {
    super([]);
  }
}
