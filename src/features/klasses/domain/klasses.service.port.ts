import { KlassDto } from './klass.dto';

import { CreateKlassesBody } from '#features/projects/domain';

export abstract class KlassesServicePort {
  abstract getKlass(id: string): Promise<Omit<KlassDto, 'project'>>;

  abstract createKlassesFromFolders(
    body: CreateKlassesBody,
  ): Promise<KlassDto[]>;
}
