import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';
import { PicturesDaoPort } from '../../domain/pictures-dao.port';

import { PicturesDaoArrayAdapter } from './adapters/pictures-dao.array-adapter';

import { Module } from '#di';

@Module({
  imports: [DatabaseDexieModule],
  providers: [
    {
      token: PicturesDaoPort,
      useToken: PicturesDaoArrayAdapter,
    },
  ],
})
export class PicturesRunTimeModule {}
