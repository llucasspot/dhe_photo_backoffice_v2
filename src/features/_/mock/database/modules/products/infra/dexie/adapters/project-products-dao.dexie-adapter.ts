import { adapter, inject } from '@mygoodstack/di-react/dist';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { ProjectProductsDaoPort } from '../../../domain/project-products-dao.port';

@adapter(ProjectProductsDaoPort, 'mock')
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
