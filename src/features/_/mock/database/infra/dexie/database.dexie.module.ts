import { Module } from '@mygoodstack/di-react';

import { DatabaseServiceDexieAdapter } from './service';

@Module({
  providers: [DatabaseServiceDexieAdapter],
})
export class DatabaseDexieModule {}
