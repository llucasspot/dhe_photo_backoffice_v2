import { Module } from '@mygoodstack/di-react/dist';

import { PhotographersDexieModule } from './infra/dexie/photographers.dexie.module';

@Module({
  providers: [PhotographersDexieModule],
})
export class AuthDatabaseModule {}
