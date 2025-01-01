import { CoordProductTemplatesDaoDexieAdapter } from './adapters/coord-product-templates-dao.dexie-adapter';
import { TemplateLayersDaoDexieAdapter } from './adapters/template-layers-dao.dexie-adapter';
import { TemplatesDaoDexieAdapter } from './adapters/templates-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  providers: [
    TemplatesDaoDexieAdapter,
    TemplateLayersDaoDexieAdapter,
    CoordProductTemplatesDaoDexieAdapter,
  ],
})
export class TemplatesDexieModule {}
