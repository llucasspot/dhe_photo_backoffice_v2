import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { StudentPicturesDaoPort } from '../../../domain/student-pictures-dao.port';

import { adapter, inject } from '#di';

@adapter(StudentPicturesDaoPort)
export class StudentPicturesDaoDexieAdapter
  extends DaoDexie<'studentPictures'>
  implements StudentPicturesDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'studentPictures');
  }
}
