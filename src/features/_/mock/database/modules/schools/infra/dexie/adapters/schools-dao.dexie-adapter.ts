import { adapter, inject, Scope } from '@mygoodstack/di-react';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { SchoolsDaoPort } from '../../../domain/schools-dao.port';

@adapter(SchoolsDaoPort, Scope.Singleton, 'mock')
export class SchoolsDaoDexieAdapter
  extends DaoDexie<'schools'>
  implements SchoolsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'schools');
  }
}
