import { KlassStudentDto } from '@domain/modules';
import { adapter, inject, Scope } from '@mygoodstack/di-react';

import { StudentsDaoPort } from '../../../../database/modules/students/domain/students-dao.port';
import { ForMockControllerService } from '../../../domain/for-mock-controller-service';
import { HttpError } from '../../../domain/http-error';

import { LogAction } from '#core/domain';
import {
  StudentsControllerServicePort,
  StudentsGetterControllerServicePort,
} from '#features/students/domain';

@adapter(StudentsControllerServicePort, Scope.Singleton, 'mock')
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
    body: Partial<KlassStudentDto>,
  ): Promise<KlassStudentDto> {
    await this.delay();
    const student = await this.studentsDao.update(studentId, body);
    if (!student) {
      throw new HttpError(404, 'Student not found');
    }
    return this.studentsGetter.getStudent(studentId);
  }

  @LogAction()
  async deleteStudent(studentId: string): Promise<void> {
    await this.delay();
    const student = this.studentsDao.deleteById(studentId);
    if (!student) {
      throw new HttpError(404, 'Student not found');
    }
  }
}
