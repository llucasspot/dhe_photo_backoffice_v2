import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';
import { PhotographersDaoPort } from '../../domain/photographers-dao.port';

import { PhotographersDaoDexieAdapter } from './adapters/photographers-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  imports: [DatabaseDexieModule],
  providers: [
    {
      token: PhotographersDaoPort,
      useToken: PhotographersDaoDexieAdapter,
    },
  ],
})
export class PhotographersDexieModule {}
