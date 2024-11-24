import { ProjectsDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { ProjectDto } from '#features/projects/domain';
import { DatabaseServiceDexieAdapter, DexieDao } from '#mock';

@singleton()
export class ProjectsDaoDexieAdapter
  extends DexieDao<Omit<ProjectDto, 'klasses' | 'school'>>
  implements ProjectsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService.getConnexion().projects);
  }
}
