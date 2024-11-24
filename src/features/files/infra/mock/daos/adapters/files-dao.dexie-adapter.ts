import { FilesDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { FileDto } from '#features/files/domain';
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
