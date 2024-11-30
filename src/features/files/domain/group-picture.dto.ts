import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { PictureDto } from './picture.dto';

import { Dto } from '#core/domain';
import { KlassDto } from '#features/klasses/domain';
import { HavePicture } from '#features/students/domain';

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
  pictureId!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PictureDto)
  picture?: PictureDto;
}
