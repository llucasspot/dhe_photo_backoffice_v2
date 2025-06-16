import { Module } from '@mygoodstack/di-react/dist';

import { PicturesDexieModule } from './infra/dexie/pictures.dexie.module';

@Module({
  providers: [PicturesDexieModule],
})
export class PicturesDatabaseModule {}
