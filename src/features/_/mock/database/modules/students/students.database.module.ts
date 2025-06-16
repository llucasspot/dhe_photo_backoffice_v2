import { Module } from '@mygoodstack/di-react/dist';

import { StudentsDexieModule } from './infra/dexie/students.dexie.module';

@Module({
  providers: [StudentsDexieModule],
})
export class StudentsDatabaseModule {}
