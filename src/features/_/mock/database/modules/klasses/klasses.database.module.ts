import { Module } from '@mygoodstack/di-react/dist';

import { KlassesDexieModule } from './infra/dexie/klasses.dexie.module';

@Module({
  providers: [KlassesDexieModule],
})
export class KlassesDatabaseModule {}
