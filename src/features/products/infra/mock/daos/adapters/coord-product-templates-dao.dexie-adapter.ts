import { inject, singleton } from '#di';
import { CoordProductTemplatesDaoPort } from '#features/products/infra';
import { DaoDexie, DatabaseServiceDexieAdapter } from '#mock/infra';

@singleton()
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
