import { plainToInstance } from 'class-transformer';

import { StudentsDaoPort } from './daos';

import { ForMockControllerService, LogAction } from '#core/domain';
import { inject, singleton } from '#di';
import {
  StudentDto,
  StudentsGetterControllerServicePort,
} from '#features/students/domain';
import { ExtractPopulatedEntity, Finder, Populator } from '#mock/domain';

@singleton()
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
    return students.map((student) => {
      return plainToInstance(StudentDto, student);
      // return this.toDto(student)
    });
  }

  @LogAction()
  async getStudent(studentId: string): Promise<StudentDto> {
    await this.delay();
    const finder = this.buildFinder(studentId);
    const student = await this.studentsDao.get(finder);
    if (!student) {
      throw new Error('Student not found');
    }
    return plainToInstance(StudentDto, student);
    // return this.toDto(student);
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

  // @ts-expect-error TODO
  private toDto({
    klass,
    ...student
  }: ExtractPopulatedEntity<ReturnType<typeof this.buildFinder>>) {
    const photos = student.photos
      .filter((photo) => photo.picture !== undefined)
      .map((photo) => photo.picture!);

    const res = {
      ...student,
      photos,
      photoIds: photos.map((photo) => photo.id),
    };

    if (klass) {
      const photos = klass.photos
        .filter((photo) => photo.picture !== undefined)
        .map((photo) => photo.picture!);
      // @ts-expect-error reassign
      klass.photos = photos;
      // @ts-expect-error reassign
      klass.photoIds = photos.map((photo) => photo.id);
    }

    return res;
  }
}
