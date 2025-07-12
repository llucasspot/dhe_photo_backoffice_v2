import { adapter, Scope } from '@mygoodstack/di-react';

import { DtoByTableName } from '../../../../../domain';
import { DaoRunTime } from '../../../../../infra/run-time';
import { ProjectsDaoPort } from '../../../domain/projects-dao.port';

@adapter(ProjectsDaoPort, Scope.Singleton, 'mock')
export class ProjectsDaoArrayAdapter
  extends DaoRunTime<DtoByTableName, 'projects'>
  implements ProjectsDaoPort
{
  constructor() {
    super([
      {
        id: '1',
        name: 'School Project A',
        state: 'published',
        schoolId: '1',
        shotDate: new Date(),
        orderEndDate: new Date(),
      },
      {
        id: '2',
        name: 'School Project B',
        state: 'published',
        schoolId: '2',
        shotDate: new Date(),
        orderEndDate: new Date(),
      },
      {
        id: '3',
        name: 'School Project C',
        state: 'published',
        schoolId: '3',
        shotDate: new Date(),
        orderEndDate: new Date(),
      },
    ]);
  }
}
