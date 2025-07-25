import { FileRejection } from 'react-dropzone';
import { inject, singleton } from '@mygoodstack/di-react';

import { klassKeys } from '../getters';

import { Action } from '#action/domain';
import { CacheServicePort } from '#cache/domain';
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
    super();
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
