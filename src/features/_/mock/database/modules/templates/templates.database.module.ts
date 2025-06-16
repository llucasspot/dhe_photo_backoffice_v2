import { Module } from '@mygoodstack/di-react';

import { TemplatesDexieModule } from './infra/dexie/templates.dexie.module';

@Module({
  providers: [TemplatesDexieModule],
})
export class TemplatesDatabaseModule {}
