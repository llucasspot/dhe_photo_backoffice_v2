import { Dao, DtoByTableName } from '#mock/domain';

export abstract class TemplatesDaoPort extends Dao<
  DtoByTableName,
  'tmplt_templates'
> {}
