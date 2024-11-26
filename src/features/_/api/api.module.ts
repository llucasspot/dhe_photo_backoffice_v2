import { DexieDatabaseModule } from '../mock/infra/dexie/dexie-database.module';

import { Module } from '#di';

@Module({
  imports: [DexieDatabaseModule],
})
export class ApiModule {}
