import { Dto } from '#core/domain';
import { Dao } from '#mock';

export class Product extends Dto<Product> {
  id!: string;
  name!: string;
  description!: string;
  longSize!: number;
  shortSize!: number;
}

export abstract class ProductsDaoPort extends Dao<'products'> {}
