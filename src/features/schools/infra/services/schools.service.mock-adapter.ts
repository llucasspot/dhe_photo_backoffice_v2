import { MockAdapter } from '#core/domain';
import { singleton } from '#di';
import {
  AvailableCurrency,
  CreateSchoolBody,
  SchoolDto,
  SchoolsServicePort,
} from '#features/schools/domain';

@singleton()
export class SchoolsServiceMockAdapter
  extends MockAdapter
  implements SchoolsServicePort
{
  private schools: SchoolDto[] = [
    {
      id: '1',
      name: 'Saint Joseph High School',
      currency: AvailableCurrency.EUR,
      city: 'Paris',
    },
    {
      id: '2',
      name: 'Lycée Victor Hugo',
      currency: AvailableCurrency.EUR,
      city: 'Lyon',
    },
    {
      id: '3',
      name: 'International School of Marseille',
      currency: AvailableCurrency.EUR,
      city: 'Marseille',
    },
  ];

  async getSchools(): Promise<SchoolDto[]> {
    return [...this.schools];
  }

  async getSchool(id: string): Promise<SchoolDto> {
    const school = this.schools.find((p) => p.id === id);
    if (!school) {
      throw new Error('School not found');
    }
    return { ...school };
  }

  async createSchools(school: CreateSchoolBody): Promise<SchoolDto> {
    const newSchool = {
      ...school,
      id: (this.schools.length + 1).toString(),
    };
    this.schools.push(newSchool);
    return { ...newSchool };
  }

  async updateSchool(
    id: string,
    schoolUpdate: Partial<SchoolDto>,
  ): Promise<SchoolDto> {
    const index = this.schools.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('School not found');
    }
    const updatedSchool = {
      ...this.schools[index],
      ...schoolUpdate,
    };
    this.schools[index] = updatedSchool;
    return { ...updatedSchool };
  }

  async deleteSchool(id: string): Promise<void> {
    const index = this.schools.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('School not found');
    }
    this.schools.splice(index, 1);
  }
}
