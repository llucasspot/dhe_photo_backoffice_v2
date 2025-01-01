import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { PicturesDaoArrayAdapter } from './adapters/pictures-dao.array-adapter';

import { Module } from '#di';

@Module({
  imports: [DatabaseDexieModule],
  providers: [PicturesDaoArrayAdapter],
})
export class PicturesRunTimeModule {}
