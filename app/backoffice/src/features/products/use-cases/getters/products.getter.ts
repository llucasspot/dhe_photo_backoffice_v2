import { inject, singleton } from '@mygoodstack/di-react';

import { ProductsControllerServicePort } from '../../domain/ports';

import { productsKeys } from './product.getter';

import { Getter } from '#action/domain';
import { ProductDto } from '#features/products/domain';

@singleton()
export class ProductsGetter extends Getter<
  ReturnType<typeof productsKeys.lists>,
  ProductDto[],
  []
> {
  constructor(
    @inject(ProductsControllerServicePort)
    private readonly productsControllerService: ProductsControllerServicePort,
  ) {
    super(() => productsKeys.lists());
  }

  get() {
    return this.productsControllerService.getProducts();
  }
}
