import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';
import { KlassesDaoPort } from '../../domain/klasses-dao.port';

import { KlassesDaoDexieAdapter } from './adapters/klasses-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  imports: [DatabaseDexieModule],
  providers: [
    {
      token: KlassesDaoPort,
      useToken: KlassesDaoDexieAdapter,
    },
  ],
})
export class KlassesDexieModule {}
