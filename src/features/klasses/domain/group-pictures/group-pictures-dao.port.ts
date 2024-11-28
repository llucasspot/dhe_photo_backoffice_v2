import { Dto } from '#core/domain';
import { Dao } from '#mock';

export class GroupPicture extends Dto<GroupPicture> {
  id!: string;
  fileId!: string;
  klassId!: string;
}

export abstract class GroupPicturesDaoPort extends Dao<'groupPictures'> {}
