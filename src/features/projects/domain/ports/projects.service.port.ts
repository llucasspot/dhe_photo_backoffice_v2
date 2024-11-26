import { CreateProjectBody } from '../create-project.body';
import { ProjectDto } from '../project.dto';

export abstract class ProjectsServicePort {
  abstract getProjects(): Promise<ProjectDto[]>;

  abstract getProject(id: string): Promise<ProjectDto>;

  abstract createProject(project: CreateProjectBody): Promise<ProjectDto>;

  abstract updateProject(
    id: string,
    project: Partial<ProjectDto>,
  ): Promise<ProjectDto>;

  abstract deleteProject(id: string): Promise<void>;

  abstract uploadPhoto(photo: File): Promise<string>;
}
