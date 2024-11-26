import { ProductsDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { DatabaseServiceDexieAdapter, DexieDao } from '#mock';

@singleton()
export class ProductsDaoDexieAdapter
  extends DexieDao<'products'>
  implements ProductsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'products');
  }
}
