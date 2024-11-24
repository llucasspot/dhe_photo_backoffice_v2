import { inject, singleton } from '#di';
import { ProjectDto, ProjectState } from '#features/projects/domain';
import { SchoolsMockDao } from '#features/schools/infra';
import { MockDao } from '#mock';

@singleton()
export class ProjectsMockDao extends MockDao<
  Omit<ProjectDto, 'klasses' | 'school'>
> {
  constructor(
    @inject(SchoolsMockDao)
    schoolsDao: SchoolsMockDao,
  ) {
    const schools = schoolsDao.getAll();
    super([
      {
        id: '1',
        name: 'School Project A',
        state: ProjectState.Published,
        schoolId: schools[0].id,
        shotDate: new Date(),
        orderEndDate: new Date(),
        klassIds: [],
      },
      {
        id: '2',
        name: 'School Project B',
        state: ProjectState.Unpublished,
        schoolId: schools[1].id,
        shotDate: new Date(),
        orderEndDate: new Date(),
        klassIds: [],
      },
      {
        id: '3',
        name: 'School Project C',
        state: ProjectState.Published,
        schoolId: schools[1].id,
        shotDate: new Date(),
        orderEndDate: new Date(),
        klassIds: [],
      },
    ]);
  }
}
