import { Module } from '@mygoodstack/di-react';

import { PhotographersDexieModule } from './infra/dexie/photographers.dexie.module';

@Module({
  providers: [PhotographersDexieModule],
})
export class AuthDatabaseModule {}
