import { Module } from '@mygoodstack/di-react/dist';

import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { CoordProductTemplatesDaoDexieAdapter } from './adapters/coord-product-templates-dao.dexie-adapter';
import { TemplateLayersDaoDexieAdapter } from './adapters/template-layers-dao.dexie-adapter';
import { TemplatesDaoDexieAdapter } from './adapters/templates-dao.dexie-adapter';

@Module({
  providers: [
    DatabaseDexieModule,
    TemplatesDaoDexieAdapter,
    TemplateLayersDaoDexieAdapter,
    CoordProductTemplatesDaoDexieAdapter,
  ],
})
export class TemplatesDexieModule {}
