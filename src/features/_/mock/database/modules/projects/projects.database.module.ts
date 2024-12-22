import { ProjectsDexieModule } from './infra/dexie/projects.dexie.module';

import { Module } from '#di';

@Module({
  imports: [ProjectsDexieModule],
})
export class ProjectsDatabaseModule {}
