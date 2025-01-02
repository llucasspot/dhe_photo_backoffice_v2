import { FileRejection } from 'react-dropzone';

import { klassKeys } from '../getters';

import { Action } from '#action/domain';
import { CacheServicePort } from '#cache/domain';
import { inject, singleton } from '#di';
import { KlassPictureDropzoneHandlerService } from '#features/projects/react';

type Body = {
  projectId: string;
  klassId: string;
  acceptedFiles: File[];
  rejectedFiles: FileRejection[];
};

@singleton()
export class CreateGroupPictureFromFilesAction extends Action<void, Body> {
  constructor(
    @inject(KlassPictureDropzoneHandlerService)
    private readonly klassPictureDropzoneHandlerService: KlassPictureDropzoneHandlerService,
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
    return this.klassPictureDropzoneHandlerService.onDrop(body);
  }

  onSuccess(_data: void, { klassId }: Body): void {
    this.cacheService.revalidateTag(klassKeys.detail(klassId));
  }

  onError(error: Error): void {
    console.error('Failed to create classes:', error);
  }
}
