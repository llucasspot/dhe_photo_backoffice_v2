import { PicturesDaoPort } from '../../../../database/modules/pictures/domain/pictures-dao.port';
import { ForMockControllerService } from '../../../domain/for-mock-controller-service';

import { LogAction } from '#core/domain';
import { inject, singleton } from '#di';
import {
  FilesCreatorControllerServicePort,
  PictureDto,
} from '#features/files/domain';
import { PictureControllerServicePort } from '#features/files/domain';

@singleton()
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