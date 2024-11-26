import { StudentsDaoPort } from './daos';

import { LogAction, MockAdapter } from '#core/domain';
import { inject, singleton } from '#di';
import { FileStudentsServicePort } from '#features/files/domain';
import { StudentsCreatorPort } from '#features/students/domain';
import { StudentsGetterPort } from '#features/students/domain';
import { CreateStudentBody, StudentDto } from '#features/students/domain';

@singleton()
export class StudentsCreatorMockAdapter
  extends MockAdapter
  implements StudentsCreatorPort
{
  constructor(
    @inject(StudentsDaoPort)
    private readonly studentsDao: StudentsDaoPort,
    @inject(FileStudentsServicePort)
    private readonly fileStudentsService: FileStudentsServicePort,
    @inject(StudentsGetterPort)
    private readonly studentsGetter: StudentsGetterPort,
  ) {
    super();
  }

  @LogAction()
  async createStudent(body: CreateStudentBody): Promise<StudentDto> {
    await this.delay();
    const student = await this.studentsDao.save({
      ...body,
      code: this.generateUniqueCode(),
    });
    await this.fileStudentsService.createStudentFiles({
      files: body.photos,
      studentId: student.id,
    });
    return await this.studentsGetter.getStudent(student.id);
  }

  @LogAction()
  async createStudents(students: CreateStudentBody[]): Promise<StudentDto[]> {
    await this.delay();
    return Promise.all(students.map((student) => this.createStudent(student)));
  }

  private generateUniqueCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}
