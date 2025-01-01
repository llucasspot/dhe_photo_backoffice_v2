import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { ProductsDaoDexieAdapter } from './adapters/products-dao.dexie-adapter';
import { ProjectProductsDaoDexieAdapter } from './adapters/project-products-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  imports: [DatabaseDexieModule],
  providers: [ProductsDaoDexieAdapter, ProjectProductsDaoDexieAdapter],
})
export class ProductsDexieModule {}
