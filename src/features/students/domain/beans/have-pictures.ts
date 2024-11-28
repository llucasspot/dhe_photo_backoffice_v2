import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

import { HavePicture } from './have-picture';

import { Dto } from '#core/domain';

export abstract class HavePictures<TDto extends object> extends Dto<
  TDto & HavePictures<object>
> {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HavePicture)
  photos: HavePicture[] = [];
  @IsArray()
  @IsString({ each: true })
  photoIds: string[] = this.photos.map((photo) => photo.fileId);
}
