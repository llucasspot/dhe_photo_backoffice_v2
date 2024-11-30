import { GroupPicturesDaoPort } from './daos';

import { ForMockControllerService } from '#core/domain';
import { inject, singleton } from '#di';
import {
  FilesCreatorControllerServicePort,
  GroupPictureDto,
} from '#features/files/domain';
import { CreateGroupPictureBody } from '#features/klasses/domain';
import {
  GroupPicturesCreatorControllerServicePort,
  KlassesControllerServicePort,
} from '#features/klasses/domain';

@singleton()
export class GroupPicturesServiceMockAdapter
  extends ForMockControllerService
  implements GroupPicturesCreatorControllerServicePort
{
  constructor(
    @inject(GroupPicturesDaoPort)
    private readonly groupPictureDao: GroupPicturesDaoPort,
    @inject(FilesCreatorControllerServicePort)
    private readonly filesService: FilesCreatorControllerServicePort,
    @inject(KlassesControllerServicePort)
    private readonly klassesControllerService: KlassesControllerServicePort,
  ) {
    super();
  }

  async createGroupPicture({
    projectId,
    klassId,
    photo,
  }: CreateGroupPictureBody): Promise<GroupPictureDto> {
    const klass = await this.klassesControllerService.getKlass(
      projectId,
      klassId,
    );
    const fileDto = await this.filesService.createFile(photo);
    return this.groupPictureDao.save({
      pictureId: fileDto.id,
      klassId: klass.id,
    });
  }
}
