import { ProjectsDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { DaoDexie, DatabaseServiceDexieAdapter } from '#mock/infra';

@singleton()
export class ProjectsDaoDexieAdapter
  extends DaoDexie<'projects'>
  implements ProjectsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'projects');
  }
}
