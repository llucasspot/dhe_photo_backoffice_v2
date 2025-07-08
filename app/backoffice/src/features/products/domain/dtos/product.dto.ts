import { IsEnum, IsString } from 'class-validator';

import type { AvailableMediaType, AvailableMediaTypeName } from './media-types';
import { availableMediaTypes, mediaTypes } from './media-types';
import type { AvailablePictureFormatName } from './picture-formats';
import { availablePictureFormats } from './picture-formats';

import { plainToInstance } from '#class-transformer';
import { Dto } from '#core/domain';

export class ProductDto extends Dto<ProductDto> {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsEnum(Object.keys(availableMediaTypes))
  mediaTypeName!: AvailableMediaTypeName;

  @IsEnum(Object.keys(availablePictureFormats))
  pictureFormatName!: AvailablePictureFormatName;

  static buildMany<
    TBody extends Omit<ProductDto, 'getMediaType' | 'getPictureFormat'>,
  >(body: TBody[]): ProductDto[] {
    return plainToInstance(this, body);
  }

  static build<
    TBody extends Omit<ProductDto, 'getMediaType' | 'getPictureFormat'>,
  >(body: TBody): ProductDto {
    return plainToInstance(this, body);
  }

  getMediaType(): AvailableMediaType {
    return mediaTypes[this.mediaTypeName];
  }

  getPictureFormat() {
    return availablePictureFormats[this.pictureFormatName];
  }
}
