import { DtoByTableName } from '../../../../../domain';
import { DaoRunTime } from '../../../../../infra/run-time';
import { StudentsDaoPort } from '../../../domain/students-dao.port';

import { singleton } from '#di';

@singleton()
export class StudentsDaoArrayAdapter
  extends DaoRunTime<DtoByTableName, 'students'>
  implements StudentsDaoPort
{
  constructor() {
    super([]);
  }
}
