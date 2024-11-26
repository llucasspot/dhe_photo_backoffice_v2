import { DexieDatabaseModule } from '../mock/infra/dexie/dexie-database.module.ts';

import { Module } from '#di';

@Module({
  imports: [DexieDatabaseModule],
})
export class ApiModule {}
