import { Dao, DtoByTableName } from '../../../domain';

export abstract class TemplatesDaoPort extends Dao<
  DtoByTableName,
  'tmplt_templates'
> {}
