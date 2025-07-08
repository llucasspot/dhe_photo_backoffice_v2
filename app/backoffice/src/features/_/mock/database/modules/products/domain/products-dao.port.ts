import { Dao, DtoByTableName } from '../../../domain';

export abstract class ProductsDaoPort extends Dao<DtoByTableName, 'products'> {}
