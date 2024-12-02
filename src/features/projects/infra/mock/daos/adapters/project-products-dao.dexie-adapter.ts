import { ProjectProductsDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { DaoDexie, DatabaseServiceDexieAdapter } from '#mock/infra';

@singleton()
export class ProjectProductsDaoDexieAdapter
  extends DaoDexie<'projectProducts'>
  implements ProjectProductsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'projectProducts');
  }
}
