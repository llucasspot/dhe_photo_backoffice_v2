import { ProductsServiceMockAdapter } from './infra/products.service.mock-adapter';

import { Module } from '#di';
import { ProductsControllerServicePort } from '#features/products/domain';

@Module({
  providers: [
    {
      token: ProductsControllerServicePort,
      useToken: ProductsServiceMockAdapter,
    },
  ],
})
export class ProductsMockApiModule {}
