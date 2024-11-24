import { Dto } from '#core/domain';

export class StudentDto extends Dto<StudentDto> {
  id!: string;
  code!: string;
  photoIds: string[] = [];
  klassId!: string;
}
