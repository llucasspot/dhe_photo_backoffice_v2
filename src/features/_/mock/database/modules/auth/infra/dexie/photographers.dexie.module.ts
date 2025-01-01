import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { PhotographersDaoDexieAdapter } from './adapters/photographers-dao.dexie-adapter';

import { Module } from '#di';

@Module({
  imports: [DatabaseDexieModule],
  providers: [PhotographersDaoDexieAdapter],
})
export class PhotographersDexieModule {}
