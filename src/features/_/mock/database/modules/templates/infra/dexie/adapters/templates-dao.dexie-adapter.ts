import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { TemplatesDaoPort } from '../../../domain/templates-dao.port';

import { adapter, inject } from '#di';

@adapter(TemplatesDaoPort)
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
