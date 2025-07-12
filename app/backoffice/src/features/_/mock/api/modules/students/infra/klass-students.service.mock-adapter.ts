import { KlassStudentDto } from '@domain/modules';
import { adapter, inject, Scope } from '@mygoodstack/di-react';
import { plainToInstance } from 'class-transformer';

import { Finder, Populator } from '../../../../database/domain';
import { StudentsDaoPort } from '../../../../database/modules/students/domain/students-dao.port';
import { ForMockControllerService } from '../../../domain/for-mock-controller-service';
import { HttpError } from '../../../domain/http-error';

import { KlassStudentsGetterControllerServicePort } from '#features/students/domain';

@adapter(KlassStudentsGetterControllerServicePort, Scope.Singleton, 'mock')
export class KlassStudentsServiceMockAdapter
  extends ForMockControllerService
  implements KlassStudentsGetterControllerServicePort
{
  constructor(
    @inject(StudentsDaoPort)
    private readonly studentsDao: StudentsDaoPort,
  ) {
    super();
  }

  async getStudents(klassId: string): Promise<KlassStudentDto[]> {
    const students = await this.studentsDao.getAll(
      new Finder('students')
        .filtersWith(['klassId', '$equals', klassId])
        .populateManyWith(
          'studentId',
          Populator.builder('photos', 'studentPictures')
            .populateWith(
              'pictureId',
              Populator.builder('picture', 'pictures').build(),
            )
            .build(),
        ),
    );
    return plainToInstance(KlassStudentDto, students);
  }

  async getStudent(
    klassId: string,
    studentId: string,
  ): Promise<KlassStudentDto> {
    const student = await this.studentsDao.get(
      new Finder('students')
        .filtersWith(['klassId', '$equals', klassId])
        .filtersWith(['id', '$equals', studentId])
        .populateManyWith(
          'studentId',
          Populator.builder('photos', 'studentPictures')
            .populateWith(
              'pictureId',
              Populator.builder('picture', 'pictures').build(),
            )
            .build(),
        ),
    );
    if (!student) {
      throw new HttpError(404, 'Student not found');
    }
    return plainToInstance(KlassStudentDto, student);
  }
}
