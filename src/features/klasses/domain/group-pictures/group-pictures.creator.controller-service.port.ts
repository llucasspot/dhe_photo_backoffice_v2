import { CreateGroupPictureBody } from './create-group-picture.body';
import { GroupPicture } from './group-pictures-dao.port';

export abstract class GroupPicturesCreatorControllerServicePort {
  abstract createGroupPicture(
    body: CreateGroupPictureBody,
  ): Promise<GroupPicture>;
}
