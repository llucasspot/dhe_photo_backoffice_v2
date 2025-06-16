import { Module } from '@mygoodstack/di-react/dist';

import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { ProductsDaoDexieAdapter } from './adapters/products-dao.dexie-adapter';
import { ProjectProductsDaoDexieAdapter } from './adapters/project-products-dao.dexie-adapter';

@Module({
  providers: [
    DatabaseDexieModule,
    ProductsDaoDexieAdapter,
    ProjectProductsDaoDexieAdapter,
  ],
})
export class ProductsDexieModule {}
