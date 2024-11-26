import { FileDto, FilesCreatorControllerServicePort } from '../../domain';

import { FilesDaoPort } from './daos';

import { ForMockControllerService, LogAction } from '#core/domain';
import { inject, singleton } from '#di';

@singleton()
export class FilesServiceMockAdapter
  extends ForMockControllerService
  implements FilesCreatorControllerServicePort
{
  constructor(
    @inject(FilesDaoPort)
    private readonly filesDao: FilesDaoPort,
  ) {
    super();
  }

  @LogAction()
  async createFile(file: File): Promise<Omit<FileDto, ''>> {
    return this.filesDao.save({ file });
  }

  @LogAction()
  async createFiles(body: File[]): Promise<Omit<FileDto, ''>[]> {
    return this.filesDao.saveMany(body.map((photo) => ({ file: photo })));
  }
}
