import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { StudentsDaoPort } from '../../../domain/students-dao.port';

import { inject, singleton } from '#di';

@singleton()
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
