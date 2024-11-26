import { CreateFileStudentBody } from './create-file-student.body';
import { CreateStudentFilesBody } from './create-student-files.body';
import { FileStudentDto } from './file-student.dto';

export abstract class FileStudentsServicePort {
  abstract createStudentFile(
    body: CreateFileStudentBody,
  ): Promise<Omit<FileStudentDto, ''>>;

  abstract createStudentFiles(
    body: CreateStudentFilesBody,
  ): Promise<Omit<FileStudentDto, ''>[]>;
}
