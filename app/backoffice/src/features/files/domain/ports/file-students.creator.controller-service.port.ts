import { CreateFileStudentBody } from '../dtos/bodies/create-file-student.body';
import { CreateStudentFilesBody } from '../dtos/bodies/create-student-files.body';
import { StudentPictureDto } from '../dtos/student-picture.dto';

export abstract class FileStudentsCreatorControllerServicePort {
  abstract createStudentFile(
    body: CreateFileStudentBody,
  ): Promise<StudentPictureDto>;

  abstract createStudentFiles(
    body: CreateStudentFilesBody,
  ): Promise<StudentPictureDto[]>;
}
