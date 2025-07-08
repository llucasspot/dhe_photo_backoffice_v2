import { Module } from '@mygoodstack/di-react';

import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { KlassesDaoDexieAdapter } from './adapters/klasses-dao.dexie-adapter';

@Module({
  providers: [DatabaseDexieModule, KlassesDaoDexieAdapter],
})
export class KlassesDexieModule {}
