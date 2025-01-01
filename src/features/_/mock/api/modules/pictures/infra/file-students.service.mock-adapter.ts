import { StudentPicturesDaoPort } from '../../../../database/modules/pictures/domain/student-pictures-dao.port';
import { ForMockControllerService } from '../../../domain/for-mock-controller-service';

import { LogAction } from '#core/domain';
import { adapter, inject } from '#di';
import { FilesCreatorControllerServicePort } from '#features/files/domain';
import { CreateFileStudentBody } from '#features/files/domain';
import { CreateStudentFilesBody } from '#features/files/domain';
import { StudentPictureDto } from '#features/files/domain';
import { FileStudentsCreatorControllerServicePort } from '#features/files/domain';
import { StudentsGetterControllerServicePort } from '#features/students/domain';

@adapter(FileStudentsCreatorControllerServicePort)
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
  }: CreateStudentFilesBody): Promise<StudentPictureDto[]> {
    const student = await this.studentsGetter.getStudent(studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    const pictures = await this.filesService.createFiles(files);
    const studentPictures = await this.studentPicturesDao.saveMany(
      pictures.map((fileDto) => ({
        pictureId: fileDto.id,
        studentId,
      })),
    );
    return studentPictures.map((studentPicture) => {
      const picture = pictures.find(
        (picture) => picture.id == studentPicture.pictureId,
      );
      return StudentPictureDto.build({
        ...studentPicture,
        picture,
        student,
      });
    });
  }

  @LogAction()
  async createStudentFile({
    studentId,
    file,
  }: CreateFileStudentBody): Promise<StudentPictureDto> {
    const student = await this.studentsGetter.getStudent(studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    const picture = await this.filesService.createFile(file);
    const studentPicture = await this.studentPicturesDao.save({
      pictureId: picture.id,
      studentId,
    });
    return StudentPictureDto.build({
      ...studentPicture,
      picture,
      student,
    });
  }
}
