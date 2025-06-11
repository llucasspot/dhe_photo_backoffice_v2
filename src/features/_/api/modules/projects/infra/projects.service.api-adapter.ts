import { HttpError } from '../../../../mock/api/domain/http-error';
import { HttpClient } from '../../../utils/http';

import { adapter, inject } from '#di';
import {
  AddProductBody,
  CreateProjectBody,
  ProjectDto,
  ProjectsControllerServicePort,
} from '#features/projects/domain';

@adapter(ProjectsControllerServicePort, ['development'])
export class ProjectsServiceApiAdapter
  implements ProjectsControllerServicePort
{
  constructor(
    @inject(HttpClient)
    private readonly httpClient: HttpClient,
  ) {}

  async getProjects(): Promise<ProjectDto[]> {
    const response = await this.httpClient.get<ProjectDto[]>('/user/projects');
    return response.data;
  }

  async getProject(projectId: string): Promise<ProjectDto> {
    const response = await this.httpClient.get<ProjectDto>(
      `/user/projects/${projectId}`,
    );
    return response.data;
  }

  async createProject(project: CreateProjectBody): Promise<ProjectDto> {
    const response = await this.httpClient.post<ProjectDto>(
      `/user/projects`,
      project,
    );
    return response.data;
  }

  async updateProject(
    projectId: string,
    body: Partial<ProjectDto>,
  ): Promise<ProjectDto> {
    const response = await this.httpClient.patch<ProjectDto>(
      `/user/projects/${projectId}`,
      body,
    );
    return response.data;
  }

  async deleteProject(projectId: string): Promise<void> {
    const response = await this.httpClient.delete<void>(
      `/user/projects/${projectId}`,
    );
    return response.data;
  }

  async uploadPhoto(file: File): Promise<string> {
    console.log(file.name);
    throw new HttpError(501, 'Method not implemented.');
  }

  async addProduct({
    projectId,
    ...body
  }: AddProductBody): Promise<ProjectDto> {
    const response = await this.httpClient.post<ProjectDto>(
      `/user/projects/${projectId}/products`,
      body,
    );
    return response.data;
  }
}
