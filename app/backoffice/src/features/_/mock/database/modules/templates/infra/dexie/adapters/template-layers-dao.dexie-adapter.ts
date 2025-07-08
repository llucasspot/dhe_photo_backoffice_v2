import { adapter, inject, Scope } from '@mygoodstack/di-react';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { TemplateLayersDaoPort } from '../../../domain/template-layers-dao.port';

@adapter(TemplateLayersDaoPort, Scope.Singleton, 'mock')
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
