import { adapter, inject, Scope } from '@mygoodstack/di-react';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { CoordProductTemplatesDaoPort } from '../../../domain/coord-product-templates-dao.port';

@adapter(CoordProductTemplatesDaoPort, Scope.Singleton, 'mock')
export class CoordProductTemplatesDaoDexieAdapter
  extends DaoDexie<'coord_product_templates'>
  implements CoordProductTemplatesDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'coord_product_templates');
  }
}
