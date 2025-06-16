import { inject, singleton } from '@mygoodstack/di-react';

import { DaoDexie, DatabaseServiceDexieAdapter } from './dexie';

@singleton()
export class FileDataDexieDao extends DaoDexie<'dexieFileData'> {
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'dexieFileData');
  }
}
