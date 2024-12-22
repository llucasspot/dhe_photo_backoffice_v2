import { ProductsDaoPort } from '../../domain/products-dao.port';

import { ProductsDaoArrayAdapter } from './adapters/products-dao.array-adapter';

import { Module } from '#di';

@Module({
  providers: [
    {
      token: ProductsDaoPort,
      useToken: ProductsDaoArrayAdapter,
    },
  ],
})
export class ProductsRunTimeModule {}
