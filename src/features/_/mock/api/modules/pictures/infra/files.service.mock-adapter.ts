import { adapter, inject } from '@mygoodstack/di-react';

import { PicturesDaoPort } from '../../../../database/modules/pictures/domain/pictures-dao.port';
import { ForMockControllerService } from '../../../domain/for-mock-controller-service';

import { LogAction } from '#core/domain';
import {
  FilesCreatorControllerServicePort,
  PictureControllerServicePort,
  PictureDto,
} from '#features/files/domain';

@adapter(FilesCreatorControllerServicePort, 'mock')
export class FilesServiceMockAdapter
  extends ForMockControllerService
  implements FilesCreatorControllerServicePort
{
  constructor(
    @inject(PicturesDaoPort)
    private readonly picturesDao: PicturesDaoPort,
    @inject(PictureControllerServicePort)
    private readonly pictureControllerService: PictureControllerServicePort,
  ) {
    super();
  }

  @LogAction()
  async createFile(file: File): Promise<PictureDto> {
    // const fileBlob = new Blob([file], { type: file.type });
    const picture = await this.picturesDao.save({});
    await this.pictureControllerService.uploadPicture(picture.id, file);
    return PictureDto.build(picture);
  }

  @LogAction()
  async createFiles(files: File[]): Promise<PictureDto[]> {
    const pictures: PictureDto[] = [];
    for (const file of files) {
      // const fileBlob = new Blob([file], { type: file.type });
      const picture = await this.createFile(file);
      pictures.push(picture);
    }
    return pictures;
  }
}
