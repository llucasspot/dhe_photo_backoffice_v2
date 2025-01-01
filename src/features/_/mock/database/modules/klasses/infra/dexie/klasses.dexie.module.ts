import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { KlassesDaoDexieAdapter } from './adapters/klasses-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  imports: [DatabaseDexieModule],
  providers: [KlassesDaoDexieAdapter],
})
export class KlassesDexieModule {}
