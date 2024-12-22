import { PhotographersDexieModule } from './infra/dexie/photographers.dexie.module';

import { Module } from '#di';

@Module({
  imports: [PhotographersDexieModule],
})
export class AuthDatabaseModule {}
