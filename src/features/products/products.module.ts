import { Module } from '#di';
import { ProductsServicePort } from '#features/products/domain';
import { ProductsServiceMockAdapter } from '#features/products/infra';

@Module({
  providers: [
    {
      token: ProductsServicePort,
      useToken: ProductsServiceMockAdapter,
    },
  ],
})
export class ProductsModule {}
