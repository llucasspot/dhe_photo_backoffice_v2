import { adapter, inject, Scope } from '@mygoodstack/di-react';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { GroupPicturesDaoPort } from '../../../domain/group-pictures-dao.port';

@adapter(GroupPicturesDaoPort, Scope.Singleton, 'mock')
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
