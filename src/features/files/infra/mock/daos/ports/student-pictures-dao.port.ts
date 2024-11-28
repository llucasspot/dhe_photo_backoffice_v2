import { Dto } from '#core/domain';
import { Dao } from '#mock';

export class StudentPicture extends Dto<StudentPicture> {
  id!: string;
  fileId!: string;
  studentId!: string;
}

export abstract class StudentPicturesDaoPort extends Dao<'studentPictures'> {}
