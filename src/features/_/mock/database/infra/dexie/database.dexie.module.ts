import { Module } from '@mygoodstack/di-react/dist';

import { DatabaseServiceDexieAdapter } from './service';

@Module({
  providers: [DatabaseServiceDexieAdapter],
})
export class DatabaseDexieModule {}
