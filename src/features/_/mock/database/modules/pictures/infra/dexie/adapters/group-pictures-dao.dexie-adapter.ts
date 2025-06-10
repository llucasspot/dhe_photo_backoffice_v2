import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { GroupPicturesDaoPort } from '../../../domain/group-pictures-dao.port';

import { adapter, inject } from '#di';

@adapter(GroupPicturesDaoPort, ['mock'])
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
