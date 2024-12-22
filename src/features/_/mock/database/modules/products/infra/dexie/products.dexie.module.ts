import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';
import { ProductsDaoPort } from '../../domain/products-dao.port';
import { ProjectProductsDaoPort } from '../../domain/project-products-dao.port';

import { ProductsDaoDexieAdapter } from './adapters/products-dao.dexie-adapter';
import { ProjectProductsDaoDexieAdapter } from './adapters/project-products-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  imports: [DatabaseDexieModule],
  providers: [
    {
      token: ProductsDaoPort,
      useToken: ProductsDaoDexieAdapter,
    },
    {
      token: ProjectProductsDaoPort,
      useToken: ProjectProductsDaoDexieAdapter,
    },
  ],
})
export class ProductsDexieModule {}
