import { Module } from '@mygoodstack/di-react';

import { PicturesDexieModule } from './infra/dexie/pictures.dexie.module';

@Module({
  providers: [PicturesDexieModule],
})
export class PicturesDatabaseModule {}
