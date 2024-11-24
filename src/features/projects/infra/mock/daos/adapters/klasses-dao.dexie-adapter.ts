import { KlassesDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { KlassDto } from '#features/projects/domain';
import { DatabaseServiceDexieAdapter, DexieDao } from '#mock';

@singleton()
export class KlassesDaoDexieAdapter
  extends DexieDao<Omit<KlassDto, 'project' | 'students' | 'studentIds'>>
  implements KlassesDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService.getConnexion().klasses);
  }

  async getByName(
    projectId: string,
    name: string,
  ): Promise<
    Omit<KlassDto, 'project' | 'students' | 'studentIds'> | undefined
  > {
    return this.entity.get({ name, projectId });
  }
}
