import { ProjectsControllerServicePort } from '../../domain/ports';

import { projectsKeys } from './project.getter';

import { Getter } from '#action/domain';
import { inject, singleton } from '#di';
import { ProjectDto } from '#features/projects/domain';

@singleton()
export class ProjectsGetter extends Getter<
  ReturnType<typeof projectsKeys.lists>,
  ProjectDto[],
  []
> {
  constructor(
    @inject(ProjectsControllerServicePort)
    private readonly projectsControllerService: ProjectsControllerServicePort,
  ) {
    super(() => projectsKeys.lists());
  }

  get() {
    return this.projectsControllerService.getProjects();
  }
}