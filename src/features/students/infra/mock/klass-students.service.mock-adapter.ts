import { StudentsDaoPort } from './daos';

import { ForMockControllerService } from '#core/domain';
import { inject, singleton } from '#di';
import { KlassDto } from '#features/klasses/domain';
import { KlassesDaoPort } from '#features/klasses/infra';
import { KlassStudentsGetterControllerServicePort } from '#features/students/domain';
import { Finder, Populator } from '#mock';

@singleton()
export class KlassStudentsServiceMockAdapter
  extends ForMockControllerService
  implements KlassStudentsGetterControllerServicePort
{
  constructor(
    @inject(KlassesDaoPort)
    private readonly klassesDao: KlassesDaoPort,
    @inject(StudentsDaoPort)
    private readonly studentsDao: StudentsDaoPort,
  ) {
    super();
  }

  async getStudents(KlassId: string): Promise<KlassDto['students']> {
    const klass = await this.klassesDao.get(
      new Finder('klasses')
        .filtersWith(['id', '$equals', KlassId])
        .populateManyWith(
          Populator.builder('students', 'students')
            .populateManyWith(
              Populator.builder('photos', 'studentFiles')
                .populateWith(
                  'fileId',
                  Populator.builder('file', 'files').build(),
                )
                .build(),
            )
            .build(),
        ),
    );
    if (!klass) {
      throw new Error('Classe not found');
    }
    return klass.students.map((student) => {
      const photos = student.photos
        .filter((photo) => photo.file !== undefined)
        .map((photo) => photo.file!);
      return {
        ...student,
        photos,
        photoIds: photos.map((photo) => photo.id),
      };
    });

    // const students = await this.studentsDao.getAll(
    //   new Finder('students')
    //     .filtersWith(['klassId', '$equals', klass.id])
    //     .populateManyWith(
    //       Populator.builder('photos', 'studentFiles')
    //         .populateWith(Populator.builder('file', 'files').build())
    //         .build(),
    //     ),
    // );
    // return students.map((student) => {
    //   const photos = student.photos.map((photo) => photo.file);
    //   return {
    //     ...student,
    //     photos,
    //     photoIds: photos.map((photo) => photo.id),
    //   };
    // });
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
          Populator.builder('photos', 'studentFiles')
            .populateWith('fileId', Populator.builder('file', 'files').build())
            .build(),
        ),
    );
    if (!student) {
      throw new Error('Student not found');
    }
    const photos = student.photos
      .filter((photo) => photo.file !== undefined)
      .map((photo) => photo.file!);
    return {
      ...student,
      photos,
      photoIds: photos.map((photo) => photo.id),
    };
  }
}
