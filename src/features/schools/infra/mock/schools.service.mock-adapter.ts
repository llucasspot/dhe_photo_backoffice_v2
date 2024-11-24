import { SchoolsMockDao } from './schools.mock-dao';

import { MockAdapter } from '#core/domain';
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
    @inject(SchoolsMockDao)
    private readonly schoolsDao: SchoolsMockDao,
  ) {
    super();
  }

  async getSchools(): Promise<SchoolDto[]> {
    await this.delay();
    return this.schoolsDao.getAll();
  }

  async getSchool(id: string): Promise<SchoolDto> {
    await this.delay();
    const school = this.schoolsDao.getById(id);
    if (!school) {
      throw new Error('School not found');
    }
    return school;
  }

  async createSchool(body: CreateSchoolBody): Promise<SchoolDto> {
    await this.delay();
    return this.schoolsDao.save({
      ...body,
    });
  }

  async updateSchool(id: string, body: Partial<SchoolDto>): Promise<SchoolDto> {
    await this.delay();
    const school = this.schoolsDao.update(id, body);
    if (!school) {
      throw new Error('School not found');
    }
    return school;
  }

  async deleteSchool(id: string): Promise<void> {
    await this.delay();
    const school = this.schoolsDao.deleteById(id);
    if (!school) {
      throw new Error('School not found');
    }
  }
}
