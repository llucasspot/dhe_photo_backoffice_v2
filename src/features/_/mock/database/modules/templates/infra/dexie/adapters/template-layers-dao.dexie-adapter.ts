import { adapter, inject } from '@mygoodstack/di-react/dist';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { TemplateLayersDaoPort } from '../../../domain/template-layers-dao.port';

@adapter(TemplateLayersDaoPort, 'mock')
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
