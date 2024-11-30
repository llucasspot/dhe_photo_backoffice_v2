import { StudentsDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { DaoDexie, DatabaseServiceDexieAdapter } from '#mock/infra';

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
