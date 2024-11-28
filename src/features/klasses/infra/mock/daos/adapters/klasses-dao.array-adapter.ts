import { KlassesDaoPort } from '../ports';

import { singleton } from '#di';
import { KlassDto } from '#features/klasses/domain';
import { MockDao } from '#mock';

@singleton()
export class KlassesDaoArrayAdapter
  extends MockDao<'klasses'>
  implements KlassesDaoPort
{
  constructor() {
    super([]);
  }

  async getByName(
    projectId: string,
    name: string,
  ): Promise<
    | Omit<
        KlassDto,
        'project' | 'students' | 'studentIds' | 'photos' | 'photoIds'
      >
    | undefined
  > {
    return this.table.find(
      (item) => item.name === name && item.projectId === projectId,
    );
  }
}
