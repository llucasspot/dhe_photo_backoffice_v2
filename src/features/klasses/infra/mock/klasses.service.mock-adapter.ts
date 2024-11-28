import { plainToInstance } from 'class-transformer';

import { KlassesDaoPort } from './daos';

import { ForMockControllerService, LogAction } from '#core/domain';
import { inject, singleton } from '#di';
import {
  KlassDto,
  KlassesControllerServicePort,
} from '#features/klasses/domain';
import { CreateKlassesBody } from '#features/projects/domain';
import { StudentsCreatorControllerServicePort } from '#features/students/domain';
import { Finder, Populator } from '#mock';

@singleton()
export class KlassesServiceMockAdapter
  extends ForMockControllerService
  implements KlassesControllerServicePort
{
  constructor(
    @inject(KlassesDaoPort)
    private readonly klassesDao: KlassesDaoPort,
    @inject(StudentsCreatorControllerServicePort)
    private readonly studentsCreator: StudentsCreatorControllerServicePort,
  ) {
    super();
  }

  @LogAction()
  async getKlass(projectId: string, klassId: string): Promise<KlassDto> {
    await this.delay();
    const klass = await this.klassesDao.get(
      new Finder('klasses')
        .filtersWith(['id', '$equals', klassId])
        .filtersWith(['projectId', '$equals', projectId])
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
            .populateWith('fileId', Populator.builder('file', 'files').build())
            .build(),
        )
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
      throw new Error('Klass not found');
    }

    // TODO pb with blob not returned when plainToInstance
    console.log(klass);
    return plainToInstance(KlassDto, klass);
  }

  @LogAction()
  async createKlassesFromFolders({
    projectId,
    klasses: bodies,
  }: CreateKlassesBody): Promise<KlassDto[]> {
    await this.delay();
    const klasses: KlassDto[] = [];
    for (const {
      name,
      studentPicture: { file },
    } of bodies) {
      let klass = await this.klassesDao.getByName(projectId, name);
      if (!klass) {
        klass = await this.klassesDao.save({
          name,
          projectId,
        });
        const student = await this.studentsCreator.createStudent({
          photos: [file],
          klassId: klass.id,
        });
        klasses.push({
          ...klass,
          students: [student],
          studentIds: [student].map((student) => student.id),
          photos: [],
          photoIds: [],
        });
      }
    }

    return klasses;
  }

  async getKlasses(projectId: string): Promise<KlassDto[]> {
    const klasses = await this.klassesDao.getAll(
      new Finder('klasses')
        .filtersWith(['projectId', '$equals', projectId])
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
        )
        .populateManyWith(
          'klassId',
          Populator.builder('photos', 'groupPictures')
            .populateWith('fileId', Populator.builder('file', 'files').build())
            .build(),
        ),
    );
    return klasses.map((klass) => {
      return plainToInstance(KlassDto, klass);
    });
  }
}
