import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { StudentsDaoPort } from '../../../domain/students-dao.port';

import { adapter, inject } from '#di';

@adapter(StudentsDaoPort)
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
