import { adapter, inject } from '@mygoodstack/di-react/dist';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { SchoolsDaoPort } from '../../../domain/schools-dao.port';

@adapter(SchoolsDaoPort, 'mock')
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
