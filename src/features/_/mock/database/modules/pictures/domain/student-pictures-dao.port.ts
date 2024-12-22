import { Dao, DtoByTableName } from '../../../domain';

export abstract class StudentPicturesDaoPort extends Dao<
  DtoByTableName,
  'studentPictures'
> {}
