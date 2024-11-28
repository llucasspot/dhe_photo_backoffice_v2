import { StudentPicturesDaoPort } from '../ports';

import { inject, singleton } from '#di';
import { DatabaseServiceDexieAdapter, DexieDao } from '#mock';

@singleton()
export class StudentPicturesDaoDexieAdapter
  extends DexieDao<'studentPictures'>
  implements StudentPicturesDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'studentPictures');
  }
}
