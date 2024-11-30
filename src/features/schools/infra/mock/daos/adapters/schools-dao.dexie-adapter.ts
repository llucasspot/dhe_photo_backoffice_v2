import { inject, singleton } from '#di';
import { SchoolsDaoPort } from '#features/schools/infra';
import { DaoDexie, DatabaseServiceDexieAdapter } from '#mock/infra';

@singleton()
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
