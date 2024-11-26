import { Dto } from '#core/domain';
import { FileDto } from '#features/files/domain';
import { KlassDto } from '#features/klasses/domain';

export class StudentDto extends Dto<StudentDto> {
  id!: string;
  code!: string;
  photoIds!: string[];
  photos!: FileDto[];
  klassId!: string;
  klass?: Omit<KlassDto, 'students' | 'studentIds'>;
}
