import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { ProjectsDaoPort } from '../../../domain/projects-dao.port';

import { adapter, inject } from '#di';

@adapter(ProjectsDaoPort, ['mock'])
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
