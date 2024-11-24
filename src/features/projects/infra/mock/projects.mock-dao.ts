import { singleton } from '#di';
import { ProjectDto, ProjectState } from '#features/projects/domain';
import { MockDao } from '#mock';

@singleton()
export class ProjectsMockDao extends MockDao<
  Omit<ProjectDto, 'klasses' | 'school'>
> {
  constructor() {
    super([
      {
        id: '1',
        name: 'School Project A',
        state: ProjectState.Published,
        schoolId: '1',
        shotDate: new Date(),
        orderEndDate: new Date(),
        klassIds: [],
      },
      {
        id: '2',
        name: 'School Project B',
        state: ProjectState.Unpublished,
        schoolId: '2',
        shotDate: new Date(),
        orderEndDate: new Date(),
        klassIds: [],
      },
      {
        id: '3',
        name: 'School Project C',
        state: ProjectState.Published,
        schoolId: '3',
        shotDate: new Date(),
        orderEndDate: new Date(),
        klassIds: [],
      },
    ]);
  }
}
