import { ProductsDaoArrayAdapter } from './adapters/products-dao.array-adapter';

import { Module } from '#di';

@Module({
  providers: [ProductsDaoArrayAdapter],
})
export class ProductsRunTimeModule {}
