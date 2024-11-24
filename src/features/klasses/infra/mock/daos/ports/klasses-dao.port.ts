import { KlassDto } from '#features/klasses/domain';
import { Dao } from '#mock';

export abstract class KlassesDaoPort extends Dao<
  Omit<KlassDto, 'project' | 'students' | 'studentIds'>
> {
  abstract getByName(
    projectId: string,
    name: string,
  ): Promise<Omit<KlassDto, 'project' | 'students' | 'studentIds'> | undefined>;
}
