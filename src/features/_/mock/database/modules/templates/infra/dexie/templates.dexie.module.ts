import { CoordProductTemplatesDaoPort } from '../../domain/coord-product-templates-dao.port';
import { TemplateLayersDaoPort } from '../../domain/template-layers-dao.port';
import { TemplatesDaoPort } from '../../domain/templates-dao.port';

import { CoordProductTemplatesDaoDexieAdapter } from './adapters/coord-product-templates-dao.dexie-adapter';
import { TemplateLayersDaoDexieAdapter } from './adapters/template-layers-dao.dexie-adapter';
import { TemplatesDaoDexieAdapter } from './adapters/templates-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  providers: [
    {
      token: TemplatesDaoPort,
      useToken: TemplatesDaoDexieAdapter,
    },
    {
      token: TemplateLayersDaoPort,
      useToken: TemplateLayersDaoDexieAdapter,
    },
    {
      token: CoordProductTemplatesDaoPort,
      useToken: CoordProductTemplatesDaoDexieAdapter,
    },
  ],
})
export class TemplatesDexieModule {}
