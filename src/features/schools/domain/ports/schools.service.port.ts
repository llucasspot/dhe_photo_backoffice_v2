import { SchoolDto } from '#features/schools/domain';

export abstract class SchoolsServicePort {
  abstract getSchools(): Promise<SchoolDto[]>;

  abstract getSchool(id: string): Promise<SchoolDto>;

  abstract createSchools(project: Omit<SchoolDto, 'id'>): Promise<SchoolDto>;

  abstract updateSchool(
    id: string,
    project: Partial<SchoolDto>,
  ): Promise<SchoolDto>;

  abstract deleteSchool(id: string): Promise<void>;
}