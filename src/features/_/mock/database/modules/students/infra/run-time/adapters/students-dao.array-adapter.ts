import { adapter } from '@mygoodstack/di-react/dist';

import { DtoByTableName } from '../../../../../domain';
import { DaoRunTime } from '../../../../../infra/run-time';
import { StudentsDaoPort } from '../../../domain/students-dao.port';

@adapter(StudentsDaoPort, 'mock')
export class StudentsDaoArrayAdapter
  extends DaoRunTime<DtoByTableName, 'students'>
  implements StudentsDaoPort
{
  constructor() {
    super([]);
  }
}
