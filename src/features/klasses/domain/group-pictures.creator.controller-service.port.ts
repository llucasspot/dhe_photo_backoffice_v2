import { CreateGroupPictureBody } from './create-group-picture.body';

import { GroupPictureDto } from '#features/files/domain';

export abstract class GroupPicturesCreatorControllerServicePort {
  abstract createGroupPicture(
    body: CreateGroupPictureBody,
  ): Promise<GroupPictureDto>;
}
