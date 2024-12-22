import { ProductsDexieModule } from './infra/dexie/products.dexie.module';

import { Module } from '#di';

@Module({
  imports: [ProductsDexieModule],
})
export class ProductsDatabaseModule {}
