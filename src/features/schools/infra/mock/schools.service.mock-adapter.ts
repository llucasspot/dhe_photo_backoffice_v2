import { plainToInstance } from 'class-transformer';

import { SchoolsDaoPort } from './daos';

import { ForMockControllerService, LogAction } from '#core/domain';
import { inject, singleton } from '#di';
import {
  CreateSchoolBody,
  SchoolDto,
  SchoolsServiceControllerServicePort,
} from '#features/schools/domain';
import { ExtractPopulatedEntity, Finder, Populator } from '#mock/domain';

@singleton()
export class SchoolsServiceMockAdapter
  extends ForMockControllerService
  implements SchoolsServiceControllerServicePort
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
    return schools.map((school) => {
      return plainToInstance(SchoolDto, school);
      // return this.toDto(school)
    });
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
    return plainToInstance(SchoolDto, school);
    // return this.toDto(school);
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
    let finder = new Finder('schools');
    if (schoolId) {
      finder = finder.filtersWith(['id', '$equals', schoolId]);
    }
    return finder.populateManyWith(
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
  }

  // @ts-expect-error TODO
  private toDto(
    school: ExtractPopulatedEntity<ReturnType<typeof this.buildFinder>>,
  ) {
    return {
      ...school,
      projects: school.projects.map((project) => ({
        ...project,
        klasses: project.klasses.map((klass) => {
          const photos = klass.photos
            .filter((photo) => photo.picture !== undefined)
            .map((photo) => photo.picture!);
          return {
            ...klass,
            students: klass.students.map((student) => {
              const photos = student.photos
                .filter((photo) => photo.picture !== undefined)
                .map((photo) => photo.picture!);
              return {
                ...student,
                photos,
                photoIds: photos.map((photo) => {
                  return photo.id;
                }),
              };
            }),
            studentIds: klass.students.map((student) => student.id),
            photos,
            photoIds: photos.map((photo) => photo.id),
          };
        }),
        klassIds: project.klasses.map((klass) => klass.id),
      })),
      projectIds: school.projects.map((project) => project.id),
    };
  }
}
