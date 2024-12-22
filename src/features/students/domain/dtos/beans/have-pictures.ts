import { IsArray, IsString, ValidateNested } from 'class-validator';

import { HavePicture } from './have-picture';

import { plainToInstance, Transform, Type } from '#class-transformer';
import { Dto } from '#core/domain';
import { PictureDto } from '#features/files/domain';

export abstract class HavePictures<TDto extends object> extends Dto<
  TDto & HavePictures<object>
> {
  @IsArray()
  @ValidateNested({ each: true })
  @Transform(({ value: values }: { value: HavePicture[] }) => {
    return values.map((value) => plainToInstance(PictureDto, value.picture));
  })
  @Type(() => PictureDto)
  photos: PictureDto[] = [];

  @IsArray()
  @IsString({ each: true })
  get photoIds(): string[] {
    return this.photos.map((photo) => photo.id);
  }
}
