import { inject, singleton } from '#di';
import { TemplateLayersDaoPort } from '#features/products/infra';
import { DaoDexie, DatabaseServiceDexieAdapter } from '#mock/infra';

@singleton()
export class TemplateLayersDaoDexieAdapter
  extends DaoDexie<'tmplt_layers'>
  implements TemplateLayersDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'tmplt_layers');
  }
}
