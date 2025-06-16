import { Module } from '@mygoodstack/di-react/dist';

import { ProductsServiceMockAdapter } from './infra/products.service.mock-adapter';

@Module({
  providers: [ProductsServiceMockAdapter],
})
export class ProductsMockApiModule {}
