import { Module } from '@mygoodstack/di-react/dist';

import { ProductsDexieModule } from './infra/dexie/products.dexie.module';

@Module({
  providers: [ProductsDexieModule],
})
export class ProductsDatabaseModule {}
