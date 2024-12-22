import { SchoolsDexieModule } from './infra/dexie/schools.dexie.module';

import { Module } from '#di';

@Module({
  imports: [SchoolsDexieModule],
})
export class SchoolsDatabaseModule {}
