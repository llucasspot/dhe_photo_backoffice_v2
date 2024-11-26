import { StudentsDaoPort } from './daos';

import { ForMockControllerService, LogAction } from '#core/domain';
import { inject, singleton } from '#di';
import { StudentsGetterControllerServicePort } from '#features/students/domain';
import {
  StudentDto,
  StudentsControllerServicePort,
} from '#features/students/domain';

@singleton()
export class StudentsServiceMockAdapter
  extends ForMockControllerService
  implements StudentsControllerServicePort
{
  constructor(
    @inject(StudentsDaoPort)
    private readonly studentsDao: StudentsDaoPort,
    @inject(StudentsGetterControllerServicePort)
    private readonly studentsGetter: StudentsGetterControllerServicePort,
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
