import { adapter, inject, Scope } from '@mygoodstack/di-react';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { PicturesDaoPort } from '../../../domain/pictures-dao.port';

@adapter(PicturesDaoPort, Scope.Singleton, 'mock')
export class PicturesDaoDexieAdapter
  extends DaoDexie<'pictures'>
  implements PicturesDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'pictures');
  }
}
