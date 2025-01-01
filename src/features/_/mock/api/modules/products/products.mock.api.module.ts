import { ProductsServiceMockAdapter } from './infra/products.service.mock-adapter';

import { Module } from '#di';

@Module({
  providers: [ProductsServiceMockAdapter],
})
export class ProductsMockApiModule {}
