import { DatabaseServiceDexieAdapter } from '../../../database.service.dexie-adapter';
import { StudentsDaoPort } from '../students-dao.port';

import { inject, singleton } from '#di';
import { StudentDto } from '#features/students/domain';
import { DexieDao } from '#mock';

@singleton()
export class StudentsDaoDexieAdapter
  extends DexieDao<Omit<StudentDto, ''>>
  implements StudentsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService.getConnexion().students);
  }
}
