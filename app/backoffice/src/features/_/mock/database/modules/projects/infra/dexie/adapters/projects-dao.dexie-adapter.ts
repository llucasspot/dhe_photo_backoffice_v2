import { adapter, inject, Scope } from '@mygoodstack/di-react';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { ProjectsDaoPort } from '../../../domain/projects-dao.port';

@adapter(ProjectsDaoPort, Scope.Singleton, 'mock')
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
