import { ProjectDto } from '@domain/modules';
import { inject, singleton } from '@mygoodstack/di-react';

import { projectsKeys } from '../getters';

import { Action } from '#action/domain';
import { CacheServicePort } from '#cache/domain';
import {
  CreateProjectBody,
  ProjectsControllerServicePort,
} from '#features/projects/domain';

@singleton()
export class CreateProjectAction extends Action<ProjectDto, CreateProjectBody> {
  constructor(
    @inject(ProjectsControllerServicePort)
    private readonly projectsControllerService: ProjectsControllerServicePort,
    @inject(CacheServicePort)
    private readonly cacheService: CacheServicePort,
  ) {
    super();
  }

  async execute(body: CreateProjectBody) {
    return this.projectsControllerService.createProject(body);
  }

  onSuccess(): void {
    this.cacheService.revalidateTag(projectsKeys.lists());
  }

  onError(error: Error): void {
    console.error('Failed to create project:', error);
  }
}
