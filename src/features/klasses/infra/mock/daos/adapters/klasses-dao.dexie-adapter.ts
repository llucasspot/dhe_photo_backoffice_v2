import { KlassesDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { DtoByTableName } from '#mock/domain';
import { DaoDexie, DatabaseServiceDexieAdapter } from '#mock/infra';

@singleton()
export class KlassesDaoDexieAdapter
  extends DaoDexie<'klasses'>
  implements KlassesDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'klasses');
  }

  async getByName(
    projectId: string,
    name: string,
  ): Promise<DtoByTableName['klasses'] | undefined> {
    return this.query.get({ name, projectId });
  }
}
