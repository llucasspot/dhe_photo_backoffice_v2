import { Finder } from '../../../../database/domain';
import { FileDataDexieDao } from '../../../../database/infra';
import { DtoByDexieTableName } from '../../../../database/infra/dexie';
import { ForMockControllerService } from '../../../domain/for-mock-controller-service';

import { inject, singleton } from '#di';
import { PictureControllerServicePort } from '#features/files/domain';

@singleton()
export class PictureControllerServiceDexieAdapter
  extends ForMockControllerService
  implements PictureControllerServicePort
{
  constructor(
    @inject(FileDataDexieDao)
    private readonly fileDataDexieDao: FileDataDexieDao,
  ) {
    super();
  }

  async getPictureById(pictureId: string): Promise<{ blob: Blob }> {
    const file = await this.fileDataDexieDao.get(
      new Finder<
        DtoByDexieTableName,
        'dexieFileData',
        DtoByDexieTableName['dexieFileData']
      >('dexieFileData').filtersWith(['pictureId', '$equals', pictureId]),
    );
    if (!file) {
      throw new Error('Picture not found');
    }
    return file;
  }

  async uploadPicture(
    pictureId: string,
    file: File,
  ): Promise<{ pictureId: string }> {
    const blob = new Blob([file], { type: file.type });
    await this.fileDataDexieDao.save({
      blob,
      pictureId,
    });
    return { pictureId };
  }
}
