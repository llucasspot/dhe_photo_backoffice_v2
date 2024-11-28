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
  async createFile(file: File): Promise<FileDto> {
    const fileBlob = new Blob([file], { type: file.type });
    return this.filesDao.save({ blob: fileBlob });
  }

  @LogAction()
  async createFiles(body: File[]): Promise<FileDto[]> {
    return this.filesDao.saveMany(
      body.map((file) => {
        const fileBlob = new Blob([file], { type: file.type });
        return { blob: fileBlob };
      }),
    );
  }
}
