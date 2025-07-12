import { ProjectKlassDto } from '@domain/modules';
import { adapter, inject, Scope } from '@mygoodstack/di-react';
import { plainToInstance } from 'class-transformer';

import { Finder, Populator } from '../../../../database/domain';
import { KlassesDaoPort } from '../../../../database/modules/klasses/domain/klasses-dao.port';
import { ForMockControllerService } from '../../../domain/for-mock-controller-service';
import { HttpError } from '../../../domain/http-error';

import { LogAction } from '#core/domain';
import { KlassesControllerServicePort } from '#features/klasses/domain';
import { CreateKlassesBody } from '#features/projects/domain';
import { StudentsCreatorControllerServicePort } from '#features/students/domain';

@adapter(KlassesControllerServicePort, Scope.Singleton, 'mock')
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
  async getKlass(projectId: string, klassId: string): Promise<ProjectKlassDto> {
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
            .populateWith(
              'pictureId',
              Populator.builder('picture', 'pictures').build(),
            )
            .build(),
        )
        .populateManyWith(
          'klassId',
          Populator.builder('students', 'students')
            .populateManyWith(
              'studentId',
              Populator.builder('photos', 'studentPictures')
                .populateWith(
                  'pictureId',
                  Populator.builder('picture', 'pictures').build(),
                )
                .build(),
            )
            .build(),
        ),
    );
    if (!klass) {
      throw new HttpError(404, 'Klass not found');
    }
    return plainToInstance(ProjectKlassDto, klass);
  }

  @LogAction()
  async createKlassesFromFolders({
    projectId,
    klasses: bodies,
  }: CreateKlassesBody): Promise<ProjectKlassDto[]> {
    await this.delay();
    const klasses: ProjectKlassDto[] = [];
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
        klasses.push(
          plainToInstance(ProjectKlassDto, {
            ...klass,
            students: [student],
          }),
        );
      }
    }

    return klasses;
  }

  async getKlasses(projectId: string): Promise<ProjectKlassDto[]> {
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
                  'pictureId',
                  Populator.builder('picture', 'pictures').build(),
                )
                .build(),
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
        ),
    );
    return plainToInstance(ProjectKlassDto, klasses);
  }
}
