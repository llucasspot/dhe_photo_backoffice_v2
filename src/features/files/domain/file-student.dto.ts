import { FileDto } from './file.dto';

import { Dto } from '#core/domain';
import { StudentDto } from '#features/students/domain';

export class FileStudentDto extends Dto<FileStudentDto> {
  id!: string;
  fileId!: string;
  file?: FileDto;
  studentId!: string;
  student?: StudentDto;
}
