import { Finder, Populator } from '../../../../database/domain';
import { StudentsDaoPort } from '../../../../database/modules/students/domain/students-dao.port';
import { ForMockControllerService } from '../../../domain/for-mock-controller-service';

import { LogAction } from '#core/domain';
import { inject } from '#di';
import {
  StudentDto,
  StudentsGetterControllerServicePort,
} from '#features/students/domain';

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
  async getStudents(): Promise<StudentDto[]> {
    await this.delay();
    const finder = this.buildFinder();
    const students = await this.studentsDao.getAll(finder);
    return StudentDto.build(students);
  }

  @LogAction()
  async getStudent(studentId: string): Promise<StudentDto> {
    await this.delay();
    const finder = this.buildFinder(studentId);
    const student = await this.studentsDao.get(finder);
    if (!student) {
      throw new Error('Student not found');
    }
    return StudentDto.build(student);
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
