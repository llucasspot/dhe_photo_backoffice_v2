import { adapter, inject, Scope } from '@mygoodstack/di-react';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { PhotographersDaoPort } from '../../../domain/photographers-dao.port';

@adapter(PhotographersDaoPort, Scope.Singleton, 'mock')
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
