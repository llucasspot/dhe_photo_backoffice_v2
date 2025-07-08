import { Dao, DtoByTableName } from '../../../domain';

export abstract class GroupPicturesDaoPort extends Dao<
  DtoByTableName,
  'groupPictures'
> {}
