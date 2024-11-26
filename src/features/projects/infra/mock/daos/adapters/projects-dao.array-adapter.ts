import { ProjectsDaoPort } from '../ports';

import { singleton } from '#di';
import { ProjectState } from '#features/projects/domain';
import { MockDao } from '#mock';

@singleton()
export class ProjectsDaoArrayAdapter
  extends MockDao<'projects'>
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
