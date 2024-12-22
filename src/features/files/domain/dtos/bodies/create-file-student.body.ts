import { Dto } from '#core/domain';

export class CreateFileStudentBody extends Dto<CreateFileStudentBody> {
  studentId!: string;
  file!: File;
}
