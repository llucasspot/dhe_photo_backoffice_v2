import { adapter, inject } from '@mygoodstack/di-react';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { TemplatesDaoPort } from '../../../domain/templates-dao.port';

@adapter(TemplatesDaoPort, 'mock')
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
