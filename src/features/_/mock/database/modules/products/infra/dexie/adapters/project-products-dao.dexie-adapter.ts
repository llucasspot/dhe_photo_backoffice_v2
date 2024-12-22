import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { ProjectProductsDaoPort } from '../../../domain/project-products-dao.port';

import { inject, singleton } from '#di';

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
