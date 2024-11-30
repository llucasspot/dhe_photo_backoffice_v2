import { inject, singleton } from '#di';
import { DaoDexie, DatabaseServiceDexieAdapter } from '#mock/infra';

@singleton()
export class FileDataDexieDao extends DaoDexie<'dexieFileData'> {
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'dexieFileData');
  }
}
