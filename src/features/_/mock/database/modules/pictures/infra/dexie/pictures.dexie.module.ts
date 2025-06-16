import { Module } from '@mygoodstack/di-react';

import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';

import { GroupPicturesDaoDexieAdapter } from './adapters/group-pictures-dao.dexie-adapter';
import { PicturesDaoDexieAdapter } from './adapters/pictures-dao.dexie-adapter';
import { StudentPicturesDaoDexieAdapter } from './adapters/student-pictures.dao.dexie-adapter';

@Module({
  providers: [
    DatabaseDexieModule,
    PicturesDaoDexieAdapter,
    GroupPicturesDaoDexieAdapter,
    StudentPicturesDaoDexieAdapter,
  ],
})
export class PicturesDexieModule {}
