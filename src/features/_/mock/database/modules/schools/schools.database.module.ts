import { Module } from '@mygoodstack/di-react/dist';

import { SchoolsDexieModule } from './infra/dexie/schools.dexie.module';

@Module({
  providers: [SchoolsDexieModule],
})
export class SchoolsDatabaseModule {}
