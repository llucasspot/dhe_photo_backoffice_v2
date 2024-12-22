import { PicturesDexieModule } from './infra/dexie/pictures.dexie.module';

import { Module } from '#di';

@Module({
  imports: [PicturesDexieModule],
})
export class PicturesDatabaseModule {}
