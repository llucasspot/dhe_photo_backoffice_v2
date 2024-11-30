import { Dao, DtoByTableName } from '#mock/domain';

export abstract class GroupPicturesDaoPort extends Dao<
  DtoByTableName,
  'groupPictures'
> {}
