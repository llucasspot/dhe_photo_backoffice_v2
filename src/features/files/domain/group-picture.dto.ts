import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { HavePicture } from '../../students/domain/beans/have-picture.ts';

import { FileDto } from './file.dto.ts';

import { Dto } from '#core/domain';
import { KlassDto } from '#features/klasses/domain';

export class GroupPictureDto
  extends Dto<GroupPictureDto>
  implements HavePicture
{
  // properties
  id!: string;
  klassId!: string;
  // relationships
  @IsOptional()
  klass?: KlassDto;

  // HavePicture properties
  @IsString()
  fileId!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => FileDto)
  file?: FileDto;
}
