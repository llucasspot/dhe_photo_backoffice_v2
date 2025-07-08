import { Module } from '@mygoodstack/di-react';

import { ProjectsDexieModule } from './infra/dexie/projects.dexie.module';

@Module({
  providers: [ProjectsDexieModule],
})
export class ProjectsDatabaseModule {}
