import { FilesDaoPort } from '../ports/files-dao.port';

import { inject, singleton } from '#di';
import { FileDto } from '#features/students/domain';
import { DatabaseServiceDexieAdapter, DexieDao } from '#mock';

@singleton()
export class FilesDaoArrayAdapter
  extends DexieDao<Omit<FileDto, ''>>
  implements FilesDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService.getConnexion().files);
  }
}
