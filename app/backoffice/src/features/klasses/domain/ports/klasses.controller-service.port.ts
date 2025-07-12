import { ProjectKlassDto } from '@domain/modules';

import { CreateKlassesBody } from '#features/projects/domain';

export abstract class KlassesControllerServicePort {
  abstract getKlasses(projectId: string): Promise<ProjectKlassDto[]>;

  abstract getKlass(
    projectId: string,
    klassId: string,
  ): Promise<ProjectKlassDto>;

  abstract createKlassesFromFolders(
    body: CreateKlassesBody,
  ): Promise<ProjectKlassDto[]>;
}
