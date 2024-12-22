import { TemplatesDexieModule } from './infra/dexie/templates.dexie.module';

import { Module } from '#di';

@Module({
  imports: [TemplatesDexieModule],
})
export class TemplatesDatabaseModule {}
