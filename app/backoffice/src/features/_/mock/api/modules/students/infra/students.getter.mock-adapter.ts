import { KlassStudentDto } from '@domain/modules';
import { adapter, inject, Scope } from '@mygoodstack/di-react';
import { plainToInstance } from 'class-transformer';

import { Finder, Populator } from '../../../../database/domain';
import { StudentsDaoPort } from '../../../../database/modules/students/domain/students-dao.port';
import { ForMockControllerService } from '../../../domain/for-mock-controller-service';
import { HttpError } from '../../../domain/http-error';

import { LogAction } from '#core/domain';
import { StudentsGetterControllerServicePort } from '#features/students/domain';

@adapter(StudentsGetterControllerServicePort, Scope.Singleton, 'mock')
export class StudentsGetterPortMockAdapter
  extends ForMockControllerService
  implements StudentsGetterControllerServicePort
{
  constructor(
    @inject(StudentsDaoPort)
    private readonly studentsDao: StudentsDaoPort,
  ) {
    super();
  }

  @LogAction()
  async getStudents(): Promise<KlassStudentDto[]> {
    await this.delay();
    const finder = this.buildFinder();
    const students = await this.studentsDao.getAll(finder);
    return plainToInstance(KlassStudentDto, students);
  }

  @LogAction()
  async getStudent(studentId: string): Promise<KlassStudentDto> {
    await this.delay();
    const finder = this.buildFinder(studentId);
    const student = await this.studentsDao.get(finder);
    if (!student) {
      throw new HttpError(404, 'Student not found');
    }
    return plainToInstance(KlassStudentDto, student);
  }

  private buildFinder(studentId?: string) {
    let finder = new Finder('students');
    if (studentId) {
      finder = finder.filtersWith(['id', '$equals', studentId]);
    }
    return finder
      .populateWith(
        'klassId',
        Populator.builder('klass', 'klasses')
          .populateWith(
            'projectId',
            Populator.builder('project', 'projects')
              .populateWith(
                'schoolId',
                Populator.builder('school', 'schools').build(),
              )
              .build(),
          )
          .populateManyWith(
            'klassId',
            Populator.builder('photos', 'groupPictures')
              .populateWith(
                'pictureId',
                Populator.builder('picture', 'pictures').build(),
              )
              .build(),
          )
          .build(),
      )
      .populateManyWith(
        'studentId',
        Populator.builder('photos', 'studentPictures')
          .populateWith(
            'pictureId',
            Populator.builder('picture', 'pictures').build(),
          )
          .build(),
      );
  }
}
