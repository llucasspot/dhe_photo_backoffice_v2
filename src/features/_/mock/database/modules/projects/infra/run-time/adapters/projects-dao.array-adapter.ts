import { adapter } from '@mygoodstack/di-react';

import { DtoByTableName } from '../../../../../domain';
import { DaoRunTime } from '../../../../../infra/run-time';
import { ProjectsDaoPort } from '../../../domain/projects-dao.port';

import { ProjectState } from '#features/projects/domain';

@adapter(ProjectsDaoPort, 'mock')
export class ProjectsDaoArrayAdapter
  extends DaoRunTime<DtoByTableName, 'projects'>
  implements ProjectsDaoPort
{
  constructor() {
    super([
      {
        id: '1',
        name: 'School Project A',
        state: ProjectState.Published,
        schoolId: '1',
        shotDate: new Date(),
        orderEndDate: new Date(),
      },
      {
        id: '2',
        name: 'School Project B',
        state: ProjectState.Unpublished,
        schoolId: '2',
        shotDate: new Date(),
        orderEndDate: new Date(),
      },
      {
        id: '3',
        name: 'School Project C',
        state: ProjectState.Published,
        schoolId: '3',
        shotDate: new Date(),
        orderEndDate: new Date(),
      },
    ]);
  }
}
