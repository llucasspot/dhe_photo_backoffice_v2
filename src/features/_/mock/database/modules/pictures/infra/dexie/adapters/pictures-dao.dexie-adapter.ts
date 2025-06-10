import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { PicturesDaoPort } from '../../../domain/pictures-dao.port';

import { adapter, inject } from '#di';

@adapter(PicturesDaoPort, ['mock'])
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
