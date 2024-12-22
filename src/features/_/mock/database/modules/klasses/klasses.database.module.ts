import { KlassesDexieModule } from './infra/dexie/klasses.dexie.module';

import { Module } from '#di';

@Module({
  imports: [KlassesDexieModule],
})
export class KlassesDatabaseModule {}
