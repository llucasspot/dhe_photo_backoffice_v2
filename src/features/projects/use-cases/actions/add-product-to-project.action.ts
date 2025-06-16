import { inject, singleton } from '@mygoodstack/di-react/dist';

import { projectsKeys } from '../getters';

import { Action } from '#action/domain';
import { CacheServicePort } from '#cache/domain';
import {
  AddProductBody,
  ProjectDto,
  ProjectsControllerServicePort,
} from '#features/projects/domain';

@singleton()
export class AddProductToProjectAction extends Action<
  ProjectDto,
  AddProductBody
> {
  constructor(
    @inject(ProjectsControllerServicePort)
    private readonly projectsControllerService: ProjectsControllerServicePort,
    @inject(CacheServicePort)
    private readonly cacheService: CacheServicePort,
  ) {
    super({
      pending: 'projects.detail.products.adding',
      success: 'projects.detail.products.added',
      error: 'projects.detail.products.error',
    });
  }

  async execute(body: AddProductBody) {
    return this.projectsControllerService.addProduct(body);
  }

  onSuccess(_data: ProjectDto, { projectId }: AddProductBody): void {
    this.cacheService.revalidateTag(projectsKeys.detail(projectId));
  }

  onError(error: Error): void {
    console.error('Failed to create product:', error);
  }
}
