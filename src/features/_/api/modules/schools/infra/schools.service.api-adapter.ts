import { HttpClient } from '../../../utils/http';

import { adapter, inject } from '#di';
import {
  CreateSchoolBody,
  SchoolDto,
  SchoolsControllerServicePort,
} from '#features/schools/domain';

@adapter(SchoolsControllerServicePort, { use: !window.__STACKBLITZ__ })
export class SchoolsServiceApiAdapter implements SchoolsControllerServicePort {
  constructor(
    @inject(HttpClient)
    private readonly httpClient: HttpClient,
  ) {}

  async getSchools(): Promise<SchoolDto[]> {
    const response = await this.httpClient.get<SchoolDto[]>('/user/schools');
    return response.data;
  }

  async getSchool(schoolId: string): Promise<SchoolDto> {
    const response = await this.httpClient.get<SchoolDto>(
      `/user/schools/${schoolId}`,
    );
    return response.data;
  }

  async createSchool(school: CreateSchoolBody): Promise<SchoolDto> {
    const response = await this.httpClient.post<SchoolDto>(
      `/user/schools`,
      school,
    );
    return response.data;
  }

  async updateSchool(
    schoolId: string,
    body: Partial<SchoolDto>,
  ): Promise<SchoolDto> {
    const response = await this.httpClient.patch<SchoolDto>(
      `/user/schools/${schoolId}`,
      body,
    );
    return response.data;
  }

  async deleteSchool(schoolId: string): Promise<void> {
    const response = await this.httpClient.delete<void>(
      `/user/schools/${schoolId}`,
    );
    return response.data;
  }
}
