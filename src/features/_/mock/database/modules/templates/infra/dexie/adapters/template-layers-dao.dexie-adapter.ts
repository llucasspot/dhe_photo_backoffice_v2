import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { TemplateLayersDaoPort } from '../../../domain/template-layers-dao.port';

import { adapter, inject } from '#di';

@adapter(TemplateLayersDaoPort)
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
