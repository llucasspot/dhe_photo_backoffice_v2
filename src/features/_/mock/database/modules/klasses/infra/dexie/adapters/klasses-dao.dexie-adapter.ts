import { DtoByTableName } from '../../../../../domain';
import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { KlassesDaoPort } from '../../../domain/klasses-dao.port';

import { adapter, inject } from '#di';

@adapter(KlassesDaoPort, ['mock'])
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
