import { GroupPicturesDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { DaoDexie, DatabaseServiceDexieAdapter } from '#mock/infra';

@singleton()
export class GroupPicturesDaoDexieAdapter
  extends DaoDexie<'groupPictures'>
  implements GroupPicturesDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'groupPictures');
  }
}
