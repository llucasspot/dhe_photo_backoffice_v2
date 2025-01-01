import { DatabaseServiceDexieAdapter } from './service';

import { Module } from '#di';

@Module({
  providers: [DatabaseServiceDexieAdapter],
})
export class DatabaseDexieModule {}
