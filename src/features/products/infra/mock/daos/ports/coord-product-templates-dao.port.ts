import { Dao, DtoByTableName } from '#mock/domain';

export abstract class CoordProductTemplatesDaoPort extends Dao<
  DtoByTableName,
  'coord_product_templates'
> {}
