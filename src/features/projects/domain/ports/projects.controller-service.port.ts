import { AddProductBody } from '../dtos/bodies/add-product.body';
import { CreateProjectBody } from '../dtos/bodies/create-project.body';
import { ProjectDto } from '../dtos/project.dto';

export abstract class ProjectsControllerServicePort {
  abstract getProjects(): Promise<ProjectDto[]>;

  abstract getProject(id: string): Promise<ProjectDto>;

  abstract createProject(project: CreateProjectBody): Promise<ProjectDto>;

  abstract updateProject(
    id: string,
    project: Partial<ProjectDto>,
  ): Promise<ProjectDto>;

  abstract deleteProject(id: string): Promise<void>;

  abstract uploadPhoto(photo: File): Promise<string>;

  abstract addProduct(body: AddProductBody): Promise<ProjectDto>;
}
