import { DatabaseDexieModule } from '../../../../infra/dexie/database.dexie.module';
import { GroupPicturesDaoPort } from '../../domain/group-pictures-dao.port';
import { PicturesDaoPort } from '../../domain/pictures-dao.port';
import { StudentPicturesDaoPort } from '../../domain/student-pictures-dao.port';

import { GroupPicturesDaoDexieAdapter } from './adapters/group-pictures-dao.dexie-adapter';
import { PicturesDaoDexieAdapter } from './adapters/pictures-dao.dexie-adapter';
import { StudentPicturesDaoDexieAdapter } from './adapters/student-pictures.dao.dexie-adapter';

import { Module } from '#di';

@Module({
  imports: [DatabaseDexieModule],
  providers: [
    {
      token: PicturesDaoPort,
      useToken: PicturesDaoDexieAdapter,
    },
    {
      token: GroupPicturesDaoPort,
      useToken: GroupPicturesDaoDexieAdapter,
    },
    {
      token: StudentPicturesDaoPort,
      useToken: StudentPicturesDaoDexieAdapter,
    },
  ],
})
export class PicturesDexieModule {}
