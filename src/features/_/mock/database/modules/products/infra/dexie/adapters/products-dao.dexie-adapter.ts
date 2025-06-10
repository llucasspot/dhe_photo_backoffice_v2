import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { ProductsDaoPort } from '../../../domain/products-dao.port';

import { adapter, inject } from '#di';

@adapter(ProductsDaoPort, ['mock'])
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
