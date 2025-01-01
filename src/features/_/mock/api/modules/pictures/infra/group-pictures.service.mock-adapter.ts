import { GroupPicturesDaoPort } from '../../../../database/modules/pictures/domain/group-pictures-dao.port';
import { ForMockControllerService } from '../../../domain/for-mock-controller-service';

import { adapter, inject } from '#di';
import {
  FilesCreatorControllerServicePort,
  GroupPictureDto,
} from '#features/files/domain';
import { CreateGroupPictureBody } from '#features/klasses/domain';
import {
  GroupPicturesCreatorControllerServicePort,
  KlassesControllerServicePort,
} from '#features/klasses/domain';

@adapter(GroupPicturesCreatorControllerServicePort)
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
    const groupPicture = await this.groupPictureDao.save({
      pictureId: fileDto.id,
      klassId: klass.id,
    });
    return GroupPictureDto.build(groupPicture);
  }
}
