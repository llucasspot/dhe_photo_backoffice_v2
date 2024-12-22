import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { PhotographersDaoPort } from '../../../domain/photographers-dao.port';

import { inject, singleton } from '#di';

@singleton()
export class PhotographersDaoDexieAdapter
  extends DaoDexie<'photographers'>
  implements PhotographersDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'photographers');
  }
}
