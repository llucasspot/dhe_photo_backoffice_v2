import { CreateGroupPictureBody } from '../../domain/group-pictures/create-group-picture.body';

import { ForMockControllerService } from '#core/domain';
import { inject, singleton } from '#di';
import { FilesCreatorControllerServicePort } from '#features/files/domain';
import {
  GroupPicture,
  GroupPicturesCreatorControllerServicePort,
  GroupPicturesDaoPort,
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
  }: CreateGroupPictureBody): Promise<GroupPicture> {
    const klass = await this.klassesControllerService.getKlass(
      projectId,
      klassId,
    );
    const fileDto = await this.filesService.createFile(photo);
    return this.groupPictureDao.save({
      fileId: fileDto.id,
      klassId: klass.id,
    });
  }
}
