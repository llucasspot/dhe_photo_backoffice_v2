import { IsOptional } from 'class-validator';

import { HavePictures } from './beans';

import { OmitType } from '#core/domain';
import { StudentKlassDto } from '#features/klasses/domain';

export class StudentDto extends HavePictures<StudentDto> {
  // properties
  id!: string;
  code!: string;
  klassId!: string;
  // relationships
  @IsOptional()
  klass?: StudentKlassDto;
}

export class KlassStudentDto extends OmitType(StudentDto, ['klass']) {}
