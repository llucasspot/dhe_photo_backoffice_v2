import { ProjectDto } from '../project.dto';

export abstract class ProjectsServicePort {
  abstract getProjects(): Promise<ProjectDto[]>;

  abstract getProject(id: string): Promise<ProjectDto>;

  abstract createProject(project: Omit<ProjectDto, 'id'>): Promise<ProjectDto>;

  abstract updateProject(
    id: string,
    project: Partial<ProjectDto>,
  ): Promise<ProjectDto>;

  abstract deleteProject(id: string): Promise<void>;
}
