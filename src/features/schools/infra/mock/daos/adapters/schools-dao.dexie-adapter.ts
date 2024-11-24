import { inject, singleton } from '#di';
import { SchoolDto } from '#features/schools/domain';
import { SchoolsDaoPort } from '#features/schools/infra';
import { DatabaseServiceDexieAdapter, DexieDao } from '#mock';

@singleton()
export class SchoolsDaoDexieAdapter
  extends DexieDao<Omit<SchoolDto, ''>>
  implements SchoolsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService.getConnexion().schools);
  }
}
