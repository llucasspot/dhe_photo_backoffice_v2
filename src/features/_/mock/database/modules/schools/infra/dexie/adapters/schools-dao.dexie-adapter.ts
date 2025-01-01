import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { SchoolsDaoPort } from '../../../domain/schools-dao.port';

import { adapter, inject } from '#di';

@adapter(SchoolsDaoPort)
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
