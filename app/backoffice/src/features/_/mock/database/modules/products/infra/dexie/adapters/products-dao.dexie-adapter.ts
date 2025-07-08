import { adapter, inject, Scope } from '@mygoodstack/di-react';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { ProductsDaoPort } from '../../../domain/products-dao.port';

@adapter(ProductsDaoPort, Scope.Singleton, 'mock')
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
