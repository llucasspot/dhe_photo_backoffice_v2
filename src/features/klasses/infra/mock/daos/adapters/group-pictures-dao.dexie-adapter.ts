import { inject, singleton } from '#di';
import { GroupPicturesDaoPort } from '#features/klasses/domain';
import { DatabaseServiceDexieAdapter, DexieDao } from '#mock';

@singleton()
export class GroupPicturesDaoDexieAdapter
  extends DexieDao<'groupPictures'>
  implements GroupPicturesDaoPort
{
  constructor(
    @inject(DatabaseServiceDexieAdapter)
    databaseService: DatabaseServiceDexieAdapter,
  ) {
    super(databaseService, 'groupPictures');
  }
}
