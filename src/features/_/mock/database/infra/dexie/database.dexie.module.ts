import { DatabaseServiceDexieAdapter } from './service';

import { Module } from '#di';

@Module({
  providers: [
    {
      token: DatabaseServiceDexieAdapter,
      useToken: DatabaseServiceDexieAdapter,
    },
  ],
})
export class DatabaseDexieModule {}
