import { inject, singleton } from '#di';
import { TemplatesDaoPort } from '#features/products/infra';
import { DaoDexie, DatabaseServiceDexieAdapter } from '#mock/infra';

@singleton()
export class TemplatesDaoDexieAdapter
  extends DaoDexie<'tmplt_templates'>
  implements TemplatesDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'tmplt_templates');
  }
}
