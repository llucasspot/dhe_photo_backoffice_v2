import { KlassesDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { KlassDto } from '#features/klasses/domain';
import { DatabaseServiceDexieAdapter, DexieDao } from '#mock';

@singleton()
export class KlassesDaoDexieAdapter
  extends DexieDao<'klasses'>
  implements KlassesDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService.getConnexion(), 'klasses');
  }

  async getByName(
    projectId: string,
    name: string,
  ): Promise<
    Omit<KlassDto, 'project' | 'students' | 'studentIds'> | undefined
  > {
    return this.query.get({ name, projectId });
  }
}
