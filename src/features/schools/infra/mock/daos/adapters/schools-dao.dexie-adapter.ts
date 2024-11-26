import { inject, singleton } from '#di';
import { SchoolsDaoPort } from '#features/schools/infra';
import { DatabaseServiceDexieAdapter, DexieDao } from '#mock';

@singleton()
export class SchoolsDaoDexieAdapter
  extends DexieDao<'schools'>
  implements SchoolsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'schools');
  }
}
