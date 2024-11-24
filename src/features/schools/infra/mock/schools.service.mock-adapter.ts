import { SchoolsDaoPort } from './daos';

import { LogAction, MockAdapter } from '#core/domain';
import { inject, singleton } from '#di';
import {
  CreateSchoolBody,
  SchoolDto,
  SchoolsServicePort,
} from '#features/schools/domain';

@singleton()
export class SchoolsServiceMockAdapter
  extends MockAdapter
  implements SchoolsServicePort
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
    return this.schoolsDao.getAll();
  }

  @LogAction()
  async getSchool(id: string): Promise<SchoolDto> {
    await this.delay();
    const school = await this.schoolsDao.getById(id);
    if (!school) {
      throw new Error('School not found');
    }
    return school;
  }

  @LogAction()
  async createSchool(body: CreateSchoolBody): Promise<SchoolDto> {
    await this.delay();
    return this.schoolsDao.save({
      ...body,
    });
  }

  @LogAction()
  async updateSchool(id: string, body: Partial<SchoolDto>): Promise<SchoolDto> {
    await this.delay();
    const school = await this.schoolsDao.update(id, body);
    if (!school) {
      throw new Error('School not found');
    }
    return school;
  }

  @LogAction()
  async deleteSchool(id: string): Promise<void> {
    await this.delay();
    const school = this.schoolsDao.deleteById(id);
    if (!school) {
      throw new Error('School not found');
    }
  }
}
