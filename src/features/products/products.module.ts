import { Module } from '#di';
import { ProductsServicePort } from '#features/products/domain';
import {
  ProductsDaoDexieAdapter,
  ProductsDaoPort,
  ProductsServiceMockAdapter,
} from '#features/products/infra';

@Module({
  providers: [
    {
      token: ProductsServicePort,
      useToken: ProductsServiceMockAdapter,
    },
    {
      token: ProductsDaoPort,
      useToken: ProductsDaoDexieAdapter,
    },
  ],
})
export class ProductsModule {}
