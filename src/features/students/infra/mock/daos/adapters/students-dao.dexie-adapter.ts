import { StudentsDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { DatabaseServiceDexieAdapter, DexieDao } from '#mock';

@singleton()
export class StudentsDaoDexieAdapter
  extends DexieDao<'students'>
  implements StudentsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService.getConnexion(), 'students');
  }
}
