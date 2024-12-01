import { StudentsDaoPort } from './daos';

import { ForMockControllerService } from '#core/domain';
import { inject, singleton } from '#di';
import { KlassDto } from '#features/klasses/domain';
import {
  KlassStudentsGetterControllerServicePort,
  StudentDto,
} from '#features/students/domain';
import { Finder, Populator } from '#mock/domain';

@singleton()
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

  async getStudents(klassId: string): Promise<KlassDto['students']> {
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
    return StudentDto.build(students);
  }

  async getStudent(
    klassId: string,
    studentId: string,
  ): Promise<KlassDto['students'][0]> {
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
      throw new Error('Student not found');
    }
    return StudentDto.build(student);
  }
}
