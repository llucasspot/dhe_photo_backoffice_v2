import { StudentsDaoPort } from './daos';

import { LogAction, MockAdapter } from '#core/domain';
import { inject, singleton } from '#di';
import { StudentDto, StudentsGetterPort } from '#features/students/domain';
import { ExtractPopulatedEntity, Finder, Populator } from '#mock';

@singleton()
export class StudentsGetterPortMockAdapter
  extends MockAdapter
  implements StudentsGetterPort
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
    return students.map((student) => this.toDto(student));
  }

  @LogAction()
  async getStudent(studentId: string): Promise<StudentDto> {
    await this.delay();
    const finder = this.buildFinder(studentId);
    const student = await this.studentsDao.get(finder);
    if (!student) {
      throw new Error('Student not found');
    }
    return this.toDto(student);
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
          .build(),
      )
      .populateManyWith(
        Populator.builder('photos', 'studentFiles')
          .populateWith('fileId', Populator.builder('file', 'files').build())
          .build(),
      );
  }

  private toDto(
    student: ExtractPopulatedEntity<ReturnType<typeof this.buildFinder>>,
  ) {
    const photos = student.photos
      .filter((photo) => photo.file !== undefined)
      .map((photo) => photo.file!);
    return { ...student, photos, photoIds: photos.map((photo) => photo.id) };
  }
}
