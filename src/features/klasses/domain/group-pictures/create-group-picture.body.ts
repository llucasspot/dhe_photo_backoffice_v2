import { Dto } from '#core/domain';

export class CreateGroupPictureBody extends Dto<CreateGroupPictureBody> {
  projectId!: string;
  klassId!: string;
  photo!: File;
}
