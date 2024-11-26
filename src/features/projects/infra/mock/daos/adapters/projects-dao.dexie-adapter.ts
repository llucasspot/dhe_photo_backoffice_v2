import { ProjectsDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { DatabaseServiceDexieAdapter, DexieDao } from '#mock';

@singleton()
export class ProjectsDaoDexieAdapter
  extends DexieDao<'projects'>
  implements ProjectsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'projects');
  }
}
