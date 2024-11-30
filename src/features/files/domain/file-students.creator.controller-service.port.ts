import { CreateFileStudentBody } from './create-file-student.body';
import { CreateStudentFilesBody } from './create-student-files.body';
import { StudentPictureDto } from './student-picture.dto';

export abstract class FileStudentsCreatorControllerServicePort {
  abstract createStudentFile(
    body: CreateFileStudentBody,
  ): Promise<StudentPictureDto>;

  abstract createStudentFiles(
    body: CreateStudentFilesBody,
  ): Promise<StudentPictureDto[]>;
}
