import { Module } from '@mygoodstack/di-react';

import { ProductsDexieModule } from './infra/dexie/products.dexie.module';

@Module({
  providers: [ProductsDexieModule],
})
export class ProductsDatabaseModule {}
