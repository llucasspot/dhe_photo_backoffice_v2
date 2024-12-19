import { Dao, DtoByTableName } from '#mock/domain';

export abstract class TemplateLayersDaoPort extends Dao<
  DtoByTableName,
  'tmplt_layers'
> {}
