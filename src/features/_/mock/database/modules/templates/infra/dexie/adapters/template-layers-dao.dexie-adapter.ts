import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { TemplateLayersDaoPort } from '../../../domain/template-layers-dao.port';

import { inject, singleton } from '#di';

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
