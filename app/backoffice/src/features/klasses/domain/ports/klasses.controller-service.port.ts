import { KlassDto } from '../dtos';

import { CreateKlassesBody } from '#features/projects/domain';

export abstract class KlassesControllerServicePort {
  abstract getKlasses(projectId: string): Promise<KlassDto[]>;

  abstract getKlass(projectId: string, klassId: string): Promise<KlassDto>;

  abstract createKlassesFromFolders(
    body: CreateKlassesBody,
  ): Promise<KlassDto[]>;
}
