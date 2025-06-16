import { Module } from '@mygoodstack/di-react/dist';

import { TemplatesDexieModule } from './infra/dexie/templates.dexie.module';

@Module({
  providers: [TemplatesDexieModule],
})
export class TemplatesDatabaseModule {}
