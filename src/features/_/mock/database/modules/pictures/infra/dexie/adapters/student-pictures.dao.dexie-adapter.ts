import { adapter, inject, Scope } from '@mygoodstack/di-react';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { StudentPicturesDaoPort } from '../../../domain/student-pictures-dao.port';

@adapter(StudentPicturesDaoPort, Scope.Singleton, 'mock')
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
