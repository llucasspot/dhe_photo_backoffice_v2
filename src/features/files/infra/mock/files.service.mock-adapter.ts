import { FileDto, FilesServicePort } from '../../domain';

import { FilesDaoPort } from './daos';

import { LogAction, MockAdapter } from '#core/domain';
import { inject, singleton } from '#di';

@singleton()
export class FilesServiceMockAdapter
  extends MockAdapter
  implements FilesServicePort
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
