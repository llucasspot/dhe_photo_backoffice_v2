import { singleton } from '#di';
import { KlassDto } from '#features/projects/domain';
import { MockDao } from '#mock';

@singleton()
export class KlassesMockDao extends MockDao<
  Omit<KlassDto, 'project' | 'students' | 'studentIds'>
> {
  constructor() {
    super([]);
  }

  getByName(
    name: string,
  ): Omit<KlassDto, 'project' | 'students' | 'studentIds'> | undefined {
    return this.table.find((item) => item.name === name);
  }
}
