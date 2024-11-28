import { Dto } from '#core/domain';
import { KlassDto } from '#features/klasses/domain';
import { Dao } from '#mock';

export class Klass extends Dto<Klass> {
  id!: string;
  name!: string;
  projectId!: string;
}

export abstract class KlassesDaoPort extends Dao<'klasses'> {
  abstract getByName(
    projectId: string,
    name: string,
  ): Promise<
    | Omit<
        KlassDto,
        'project' | 'students' | 'studentIds' | 'photos' | 'photoIds'
      >
    | undefined
  >;
}
