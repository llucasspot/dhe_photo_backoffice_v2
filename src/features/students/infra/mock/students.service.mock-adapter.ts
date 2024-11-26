import { StudentsDaoPort } from './daos';

import { LogAction, MockAdapter } from '#core/domain';
import { inject, singleton } from '#di';
import { StudentsGetterPort } from '#features/students/domain';
import { StudentDto, StudentsServicePort } from '#features/students/domain';

@singleton()
export class StudentsServiceMockAdapter
  extends MockAdapter
  implements StudentsServicePort
{
  constructor(
    @inject(StudentsDaoPort)
    private readonly studentsDao: StudentsDaoPort,
    @inject(StudentsGetterPort)
    private readonly studentsGetter: StudentsGetterPort,
  ) {
    super();
  }

  @LogAction()
  async updateStudent(
    studentId: string,
    body: Partial<StudentDto>,
  ): Promise<StudentDto> {
    await this.delay();
    const student = await this.studentsDao.update(studentId, body);
    if (!student) {
      throw new Error('Student not found');
    }
    return this.studentsGetter.getStudent(studentId);
  }

  @LogAction()
  async deleteStudent(studentId: string): Promise<void> {
    await this.delay();
    const student = this.studentsDao.deleteById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }
  }
}
