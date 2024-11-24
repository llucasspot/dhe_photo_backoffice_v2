import { CreateKlassesBody } from '../create-klasses.body';
import { CreateProjectBody } from '../create-project.body';
import { ProjectDto } from '../project.dto';

import { KlassDto } from '#features/klasses/domain';

export abstract class ProjectsServicePort {
  abstract getProjects(): Promise<ProjectDto[]>;

  abstract getProject(id: string): Promise<ProjectDto>;

  abstract createProject(project: CreateProjectBody): Promise<ProjectDto>;

  abstract updateProject(
    id: string,
    project: Partial<ProjectDto>,
  ): Promise<ProjectDto>;

  abstract deleteProject(id: string): Promise<void>;

  abstract createKlassesFromFolders(
    body: CreateKlassesBody,
  ): Promise<KlassDto[]>;

  abstract uploadPhoto(photo: File): Promise<string>;
}
