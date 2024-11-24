import { ProductsDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { ProductDto } from '#features/products/domain';
import { DatabaseServiceDexieAdapter, DexieDao } from '#mock';

@singleton()
export class ProductsDaoDexieAdapter
  extends DexieDao<Omit<ProductDto, ''>>
  implements ProductsDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService.getConnexion().products);
  }
}
