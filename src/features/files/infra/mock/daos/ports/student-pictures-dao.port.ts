import { Dao, DtoByTableName } from '#mock/domain';

export abstract class StudentPicturesDaoPort extends Dao<
  DtoByTableName,
  'studentPictures'
> {}
