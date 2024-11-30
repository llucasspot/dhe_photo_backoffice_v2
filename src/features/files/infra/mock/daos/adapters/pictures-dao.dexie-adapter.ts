import { PicturesDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { DaoDexie, DatabaseServiceDexieAdapter } from '#mock/infra';

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
