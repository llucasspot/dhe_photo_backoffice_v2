import { StudentsDexieModule } from './infra/dexie/students.dexie.module';

import { Module } from '#di';

@Module({
  imports: [StudentsDexieModule],
})
export class StudentsDatabaseModule {}
