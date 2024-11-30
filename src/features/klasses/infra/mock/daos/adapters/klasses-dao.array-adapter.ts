import { KlassesDaoPort } from '../ports';

import { singleton } from '#di';
import { DtoByTableName } from '#mock/domain';
import { MockDao } from '#mock/infra';

@singleton()
export class KlassesDaoArrayAdapter
  extends MockDao<DtoByTableName, 'klasses'>
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
