import { adapter, inject, Scope } from '@mygoodstack/di-react';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { StudentsDaoPort } from '../../../domain/students-dao.port';

@adapter(StudentsDaoPort, Scope.Singleton, 'mock')
export class StudentsDaoDexieAdapter
  extends DaoDexie<'students'>
  implements StudentsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'students');
  }
}
