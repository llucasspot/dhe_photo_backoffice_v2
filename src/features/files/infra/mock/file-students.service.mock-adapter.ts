import { FilesCreatorControllerServicePort } from '../../domain';

import { StudentPicturesDaoPort } from './daos';

import { ForMockControllerService, LogAction } from '#core/domain';
import { inject, singleton } from '#di';
import { CreateFileStudentBody } from '#features/files/domain';
import { CreateStudentFilesBody } from '#features/files/domain';
import { StudentPictureDto } from '#features/files/domain';
import { FileStudentsCreatorControllerServicePort } from '#features/files/domain';
import { StudentsGetterControllerServicePort } from '#features/students/domain';

@singleton()
export class FileStudentsServiceMockAdapter
  extends ForMockControllerService
  implements FileStudentsCreatorControllerServicePort
{
  constructor(
    @inject(StudentPicturesDaoPort)
    private readonly studentPicturesDao: StudentPicturesDaoPort,
    @inject(FilesCreatorControllerServicePort)
    private readonly filesService: FilesCreatorControllerServicePort,
    @inject(StudentsGetterControllerServicePort)
    private readonly studentsGetter: StudentsGetterControllerServicePort,
  ) {
    super();
  }

  async createStudentFiles({
    studentId,
    files,
  }: CreateStudentFilesBody): Promise<Omit<StudentPictureDto, ''>[]> {
    const student = await this.studentsGetter.getStudent(studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    const fileDtos = await this.filesService.createFiles(files);
    const fileStudents = await this.studentPicturesDao.saveMany(
      fileDtos.map((fileDto) => ({
        fileId: fileDto.id,
        studentId,
      })),
    );
    return fileStudents.map((fileStudent) => {
      return {
        ...fileStudent,
        file: fileDtos.find((fileDto) => fileDto.id == fileStudent.fileId)!,
        student,
      };
    });
  }

  @LogAction()
  async createStudentFile({
    studentId,
    file,
  }: CreateFileStudentBody): Promise<Omit<StudentPictureDto, ''>> {
    const student = await this.studentsGetter.getStudent(studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    const fileDto = await this.filesService.createFile(file);
    const fileStudent = await this.studentPicturesDao.save({
      fileId: fileDto.id,
      studentId,
    });
    return {
      ...fileStudent,
      file: fileDto,
      student,
    };
  }
}
