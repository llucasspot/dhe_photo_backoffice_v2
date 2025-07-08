import { Module } from '@mygoodstack/di-react';

import { SchoolsDexieModule } from './infra/dexie/schools.dexie.module';

@Module({
  providers: [SchoolsDexieModule],
})
export class SchoolsDatabaseModule {}
