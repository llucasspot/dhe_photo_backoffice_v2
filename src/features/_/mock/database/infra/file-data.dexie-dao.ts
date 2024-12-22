import { DaoDexie, DatabaseServiceDexieAdapter } from './dexie';

import { inject, singleton } from '#di';

@singleton()
export class FileDataDexieDao extends DaoDexie<'dexieFileData'> {
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'dexieFileData');
  }
}
