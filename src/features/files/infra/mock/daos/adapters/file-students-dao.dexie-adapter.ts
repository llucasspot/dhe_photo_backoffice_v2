import { FileStudentsDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { DatabaseServiceDexieAdapter, DexieDao } from '#mock';

@singleton()
export class FileStudentsDaoDexieAdapter
  extends DexieDao<'studentFiles'>
  implements FileStudentsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService.getConnexion(), 'studentFiles');
  }
}
