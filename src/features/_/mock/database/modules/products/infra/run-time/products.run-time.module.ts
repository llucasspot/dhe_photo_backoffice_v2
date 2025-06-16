import { Module } from '@mygoodstack/di-react/dist';

import { ProductsDaoArrayAdapter } from './adapters/products-dao.array-adapter';

@Module({
  providers: [ProductsDaoArrayAdapter],
})
export class ProductsRunTimeModule {}
