import { ProductDto } from '#features/products/domain';
import { Dao } from '#mock';

export type Product = Pick<
  ProductDto,
  'id' | 'name' | 'description' | 'longSize' | 'shortSize'
>;

export abstract class ProductsDaoPort extends Dao<'products'> {}
