import { inject, singleton } from '@mygoodstack/di-react';

import { ProductsControllerServicePort } from '../../domain/ports';

import { Getter } from '#action/domain';
import { ProductDto } from '#features/products/domain';

export const productsKeys = {
  all: ['products'] as const,
  lists: () => [...productsKeys.all, 'list'] as const,
  list: (filters: string) => [...productsKeys.lists(), { filters }] as const,
  details: () => [...productsKeys.all, 'detail'] as const,
  detail: (id: string) => [...productsKeys.details(), id] as const,
};

@singleton()
export class ProductGetter extends Getter<
  ReturnType<typeof productsKeys.detail>,
  ProductDto,
  [string]
> {
  constructor(
    @inject(ProductsControllerServicePort)
    private readonly productsControllerService: ProductsControllerServicePort,
  ) {
    super((id) => productsKeys.detail(id));
  }

  get(id: string) {
    return this.productsControllerService.getProduct(id);
  }
}
