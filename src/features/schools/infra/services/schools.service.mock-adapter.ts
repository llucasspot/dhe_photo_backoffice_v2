import { singleton } from '#di';
import { SchoolDto, SchoolsServicePort } from '#features/schools/domain';

@singleton()
export class SchoolsServiceMockAdapter extends SchoolsServicePort {
  private schools: SchoolDto[] = [
    {
      id: '1',
      name: 'Saint Joseph High School',
      location: 'Paris',
      type: 'private',
      studentCount: 850,
      status: 'active',
    },
    {
      id: '2',
      name: 'Lycée Victor Hugo',
      location: 'Lyon',
      type: 'public',
      studentCount: 1200,
      status: 'active',
    },
    {
      id: '3',
      name: 'International School of Marseille',
      location: 'Marseille',
      type: 'private',
      studentCount: 600,
      status: 'inactive',
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

  async createSchools(school: Omit<SchoolDto, 'id'>): Promise<SchoolDto> {
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
