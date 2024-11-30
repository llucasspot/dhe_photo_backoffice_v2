import { Dao, DtoByTableName } from '#mock/domain';

export abstract class ProductsDaoPort extends Dao<DtoByTableName, 'products'> {}
