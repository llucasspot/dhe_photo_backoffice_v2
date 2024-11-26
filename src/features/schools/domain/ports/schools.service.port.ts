import { CreateSchoolBody, SchoolDto } from '#features/schools/domain';

export abstract class SchoolsServicePort {
  abstract getSchools(): Promise<SchoolDto[]>;

  abstract getSchool(schoolId: string): Promise<SchoolDto>;

  abstract createSchool(project: CreateSchoolBody): Promise<SchoolDto>;

  abstract updateSchool(
    schoolId: string,
    project: Partial<SchoolDto>,
  ): Promise<SchoolDto>;

  abstract deleteSchool(id: string): Promise<void>;
}
