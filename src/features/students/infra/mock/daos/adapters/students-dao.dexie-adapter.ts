import { StudentsDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { StudentDto } from '#features/students/domain';
import { DatabaseServiceDexieAdapter } from '#mock';
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
