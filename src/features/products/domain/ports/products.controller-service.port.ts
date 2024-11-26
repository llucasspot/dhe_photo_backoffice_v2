import { CreateProductBody } from '../create-product.body';
import { ProductDto } from '../product.dto';

export abstract class ProductsControllerServicePort {
  abstract getProducts(): Promise<ProductDto[]>;

  abstract getProduct(id: string): Promise<ProductDto>;

  abstract createProduct(product: CreateProductBody): Promise<ProductDto>;

  abstract updateProduct(
    id: string,
    product: Partial<ProductDto>,
  ): Promise<ProductDto>;

  abstract deleteProduct(id: string): Promise<void>;
}
