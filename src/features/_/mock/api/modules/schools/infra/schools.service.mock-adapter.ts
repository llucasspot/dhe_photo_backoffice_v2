import { Finder, Populator } from '../../../../database/domain';
import { SchoolsDaoPort } from '../../../../database/modules/schools/domain/schools-dao.port';
import { ForMockControllerService } from '../../../domain/for-mock-controller-service';

import { LogAction } from '#core/domain';
import { adapter, inject } from '#di';
import {
  CreateSchoolBody,
  SchoolDto,
  SchoolsControllerServicePort,
} from '#features/schools/domain';

@adapter(SchoolsControllerServicePort, { use: !!window.__STACKBLITZ__ })
export class SchoolsServiceMockAdapter
  extends ForMockControllerService
  implements SchoolsControllerServicePort
{
  constructor(
    @inject(SchoolsDaoPort)
    private readonly schoolsDao: SchoolsDaoPort,
  ) {
    super();
  }

  @LogAction()
  async getSchools(): Promise<SchoolDto[]> {
    await this.delay();
    const finder = this.buildFinder();
    const schools = await this.schoolsDao.getAll(finder);
    return SchoolDto.build(schools);
  }

  @LogAction()
  async getSchool(schoolId: string): Promise<SchoolDto> {
    await this.delay();
    const finder = this.buildFinder(schoolId);
    const school = await this.schoolsDao.get(finder);
    if (!school) {
      throw new Error('School not found');
    }
    console.log('[SchoolsServiceMockAdapter] [getSchool] [school] ', school);
    return SchoolDto.build(school);
  }

  @LogAction()
  async createSchool(body: CreateSchoolBody): Promise<SchoolDto> {
    await this.delay();
    const school = await this.schoolsDao.save({
      ...body,
    });
    return this.getSchool(school.id);
  }

  @LogAction()
  async updateSchool(
    schoolId: string,
    body: Partial<SchoolDto>,
  ): Promise<SchoolDto> {
    await this.delay();
    const school = await this.schoolsDao.update(schoolId, body);
    if (!school) {
      throw new Error('School not found');
    }
    return this.getSchool(school.id);
  }

  @LogAction()
  async deleteSchool(id: string): Promise<void> {
    await this.delay();
    const school = this.schoolsDao.deleteById(id);
    if (!school) {
      throw new Error('School not found');
    }
  }

  private buildFinder(schoolId?: string) {
    const finder = new Finder('schools').populateManyWith(
      'schoolId',
      Populator.builder('projects', 'projects')
        .populateManyWith(
          'projectId',
          Populator.builder('klasses', 'klasses')
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
            )
            .build(),
        )
        .build(),
    );
    if (schoolId) {
      finder.filtersWith(['id', '$equals', schoolId]);
    }
    return finder;
  }
}
