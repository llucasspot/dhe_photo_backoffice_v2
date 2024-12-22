import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { PicturesDaoPort } from '../../../domain/pictures-dao.port';

import { inject, singleton } from '#di';

@singleton()
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
