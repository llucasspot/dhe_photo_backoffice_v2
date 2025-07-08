import { Dao, DtoByTableName } from '../../../domain';

export abstract class TemplateLayersDaoPort extends Dao<
  DtoByTableName,
  'tmplt_layers'
> {}
