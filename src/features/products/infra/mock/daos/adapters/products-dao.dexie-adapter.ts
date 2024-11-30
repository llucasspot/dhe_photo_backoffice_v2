import { ProductsDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { DaoDexie, DatabaseServiceDexieAdapter } from '#mock/infra';

@singleton()
export class ProductsDaoDexieAdapter
  extends DaoDexie<'products'>
  implements ProductsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'products');
  }
}
