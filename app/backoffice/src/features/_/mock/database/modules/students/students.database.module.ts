import { Module } from '@mygoodstack/di-react';

import { StudentsDexieModule } from './infra/dexie/students.dexie.module';

@Module({
  providers: [StudentsDexieModule],
})
export class StudentsDatabaseModule {}
