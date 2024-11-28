import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { HavePicture } from '../../students/domain/beans/have-picture.ts';

import { FileDto } from './file.dto.ts';

import { Dto } from '#core/domain';
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
  fileId!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => FileDto)
  file?: FileDto;
}
