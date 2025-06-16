import { Module } from '@mygoodstack/di-react';

import { ProductsDaoArrayAdapter } from './adapters/products-dao.array-adapter';

@Module({
  providers: [ProductsDaoArrayAdapter],
})
export class ProductsRunTimeModule {}
