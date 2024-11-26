import { KlassDto } from '#features/klasses/domain';
import { Dao } from '#mock';

export type Klass = Pick<KlassDto, 'id' | 'name' | 'projectId'>;

export abstract class KlassesDaoPort extends Dao<'klasses'> {
  abstract getByName(
    projectId: string,
    name: string,
  ): Promise<Omit<KlassDto, 'project' | 'students' | 'studentIds'> | undefined>;
}
