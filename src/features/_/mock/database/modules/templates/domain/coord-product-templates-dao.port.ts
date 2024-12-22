import { Dao, DtoByTableName } from '../../../domain';

export abstract class CoordProductTemplatesDaoPort extends Dao<
  DtoByTableName,
  'coord_product_templates'
> {}
