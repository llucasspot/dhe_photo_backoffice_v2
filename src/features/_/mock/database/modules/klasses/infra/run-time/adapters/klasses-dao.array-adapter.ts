import { adapter } from '@mygoodstack/di-react';

import { DtoByTableName } from '../../../../../domain';
import { DaoRunTime } from '../../../../../infra/run-time';
import { KlassesDaoPort } from '../../../domain/klasses-dao.port';

@adapter(KlassesDaoPort, 'mock')
export class KlassesDaoArrayAdapter
  extends DaoRunTime<DtoByTableName, 'klasses'>
  implements KlassesDaoPort
{
  constructor() {
    super([]);
  }

  async getByName(
    projectId: string,
    name: string,
  ): Promise<DtoByTableName['klasses'] | undefined> {
    return this.table.find(
      (item) => item.name === name && item.projectId === projectId,
    );
  }
}
