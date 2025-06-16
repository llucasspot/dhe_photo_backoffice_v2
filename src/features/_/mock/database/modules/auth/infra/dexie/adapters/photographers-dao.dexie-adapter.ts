import { adapter, inject } from '@mygoodstack/di-react/dist';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { PhotographersDaoPort } from '../../../domain/photographers-dao.port';

@adapter(PhotographersDaoPort, 'mock')
export class PhotographersDaoDexieAdapter
  extends DaoDexie<'photographers'>
  implements PhotographersDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'photographers');
  }
}
