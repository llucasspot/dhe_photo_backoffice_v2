import { adapter, inject } from '@mygoodstack/di-react/dist';

import {
  DaoDexie,
  DatabaseServiceDexieAdapter,
} from '../../../../../infra/dexie';
import { StudentPicturesDaoPort } from '../../../domain/student-pictures-dao.port';

@adapter(StudentPicturesDaoPort, 'mock')
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
