import { Module } from '@mygoodstack/di-react';

import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { PhotographersDaoDexieAdapter } from './adapters/photographers-dao.dexie-adapter';

@Module({
  providers: [DatabaseDexieModule, PhotographersDaoDexieAdapter],
})
export class PhotographersDexieModule {}
