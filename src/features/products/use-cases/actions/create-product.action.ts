import { productsKeys } from '../getters';

import { Action } from '#action/domain';
import { CacheServicePort } from '#cache/domain';
import { inject, singleton } from '#di';
import {
  CreateProductBody,
  ProductDto,
  ProductsControllerServicePort,
} from '#features/products/domain';

@singleton()
export class CreateProductAction extends Action<ProductDto, CreateProductBody> {
  constructor(
    @inject(ProductsControllerServicePort)
    private readonly productsControllerService: ProductsControllerServicePort,
    @inject(CacheServicePort)
    private readonly cacheService: CacheServicePort,
  ) {
    super({
      success: 'products.create.success',
      pending: 'products.create.pending',
      error: 'products.create.error',
    });
  }

  async execute(body: CreateProductBody) {
    return this.productsControllerService.createProduct(body);
  }

  onSuccess(): void {
    this.cacheService.revalidateTag(productsKeys.lists());
  }
  onError(error: Error): void {
    console.error('Failed to create product:', error);
  }
}
