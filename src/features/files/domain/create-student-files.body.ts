import { Dto } from '#core/domain';

export class CreateStudentFilesBody extends Dto<CreateStudentFilesBody> {
  studentId!: string;
  files!: File[];
}
