import { FileRejection } from 'react-dropzone';

import { projectsKeys } from '../getters';

import { Action } from '#action/domain';
import { CacheServicePort } from '#cache/domain';
import { inject, singleton } from '#di';
import { KlassDropzoneHandlerService } from '#features/projects/react';

type Body = {
  projectId: string;
  acceptedFiles: File[];
  rejectedFiles: FileRejection[];
};

@singleton()
export class CreateKlassesFromFilesAction extends Action<void, Body> {
  constructor(
    @inject(KlassDropzoneHandlerService)
    private readonly klassDropzoneHandlerService: KlassDropzoneHandlerService,
    @inject(CacheServicePort)
    private readonly cacheService: CacheServicePort,
  ) {
    super({
      pending: 'klasses.create.pending',
      success: 'klasses.create.success',
      error: 'klasses.create.error',
    });
  }

  async execute(body: Body) {
    return this.klassDropzoneHandlerService.onDrop(body);
  }

  onSuccess(_data: void, { projectId }: Body): void {
    this.cacheService.revalidateTag(projectsKeys.detail(projectId));
  }

  onError(error: Error): void {
    console.error('Failed to create classes:', error);
  }
}
