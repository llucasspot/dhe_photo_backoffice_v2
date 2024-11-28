import { plainToInstance } from 'class-transformer';

import { StudentsDaoPort } from './daos';

import { ForMockControllerService } from '#core/domain';
import { inject, singleton } from '#di';
import { KlassDto } from '#features/klasses/domain';
import { KlassesDaoPort } from '#features/klasses/infra';
import {
  KlassStudentsGetterControllerServicePort,
  StudentDto,
} from '#features/students/domain';
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

  async getStudents(klassId: string): Promise<KlassDto['students']> {
    const klass = await this.klassesDao.get(
      new Finder('klasses')
        .filtersWith(['id', '$equals', klassId])
        .populateManyWith(
          'klassId',
          Populator.builder('students', 'students')
            .populateManyWith(
              'studentId',
              Populator.builder('photos', 'studentPictures')
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
      return plainToInstance(StudentDto, student);
      // const photos = student.photos
      //   .filter((photo) => photo.file !== undefined)
      //   .map((photo) => photo.file!);
      // return {
      //   ...student,
      //   photos,
      //   photoIds: photos.map((photo) => photo.id),
      // };
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
          'studentId',
          Populator.builder('photos', 'studentPictures')
            .populateWith('fileId', Populator.builder('file', 'files').build())
            .build(),
        ),
    );
    if (!student) {
      throw new Error('Student not found');
    }
    return plainToInstance(StudentDto, student);
    // const photos = student.photos
    //   .filter((photo) => photo.file !== undefined)
    //   .map((photo) => photo.file!);
    // return {
    //   ...student,
    //   photos,
    //   photoIds: photos.map((photo) => photo.id),
    // };
  }
}
