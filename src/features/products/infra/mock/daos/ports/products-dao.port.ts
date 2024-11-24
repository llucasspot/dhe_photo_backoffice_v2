import { ProductDto } from '#features/products/domain';
import { Dao } from '#mock';

export abstract class ProductsDaoPort extends Dao<Omit<ProductDto, ''>> {}
