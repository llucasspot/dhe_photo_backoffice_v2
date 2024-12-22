import { Dto } from '#core/domain';

export class CreateStudentBody extends Dto<CreateStudentBody> {
  klassId!: string;
  photos: File[] = [];
}
