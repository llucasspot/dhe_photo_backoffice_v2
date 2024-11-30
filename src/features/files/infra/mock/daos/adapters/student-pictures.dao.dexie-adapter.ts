import { StudentPicturesDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { DaoDexie, DatabaseServiceDexieAdapter } from '#mock/infra';

@singleton()
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
