import { inject, singleton } from '@mygoodstack/di-react';

import { ProjectsControllerServicePort } from '../../domain/ports';

import { Getter } from '#action/domain';
import { ProjectDto } from '#features/projects/domain';

export const projectsKeys = {
  all: ['projects'] as const,
  lists: () => [...projectsKeys.all, 'list'] as const,
  list: (filters: string) => [...projectsKeys.lists(), { filters }] as const,
  details: () => [...projectsKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectsKeys.details(), id] as const,
};

@singleton()
export class ProjectGetter extends Getter<
  ReturnType<typeof projectsKeys.detail>,
  ProjectDto,
  [string]
> {
  constructor(
    @inject(ProjectsControllerServicePort)
    private readonly projectsControllerService: ProjectsControllerServicePort,
  ) {
    super((id) => projectsKeys.detail(id));
  }

  get(id: string) {
    return this.projectsControllerService.getProject(id);
  }
}
