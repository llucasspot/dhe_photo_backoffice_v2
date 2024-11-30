import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { PictureDto } from '#features/files/domain';

export class HavePicture {
  @IsString()
  pictureId!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PictureDto)
  picture?: PictureDto;
}
