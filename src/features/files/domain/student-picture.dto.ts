import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { PictureDto } from './picture.dto';

import { Dto } from '#core/domain';
import { HavePicture } from '#features/students/domain';
import { StudentDto } from '#features/students/domain';

export class StudentPictureDto
  extends Dto<StudentPictureDto>
  implements HavePicture
{
  // properties
  id!: string;
  studentId!: string;
  // relationships
  @IsOptional()
  student?: StudentDto;

  // HavePicture properties
  @IsString()
  pictureId!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PictureDto)
  picture?: PictureDto;
}
