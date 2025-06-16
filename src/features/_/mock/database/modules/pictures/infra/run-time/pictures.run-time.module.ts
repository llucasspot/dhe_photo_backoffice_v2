import { Module } from '@mygoodstack/di-react/dist';

import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { PicturesDaoArrayAdapter } from './adapters/pictures-dao.array-adapter';

@Module({
  providers: [DatabaseDexieModule, PicturesDaoArrayAdapter],
})
export class PicturesRunTimeModule {}
