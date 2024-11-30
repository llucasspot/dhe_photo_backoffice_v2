import { Module } from '#di';
import { ProductsControllerServicePort } from '#features/products/domain';
import { ProductsServiceMockAdapter } from '#features/products/infra';

@Module({
  providers: [
    {
      token: ProductsControllerServicePort,
      useToken: ProductsServiceMockAdapter,
    },
  ],
})
export class ProductsMockModule {}
