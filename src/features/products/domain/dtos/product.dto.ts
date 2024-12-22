import { IsEnum, IsString } from 'class-validator';

import type { AvailableMediaType, AvailableMediaTypeName } from './media-types';
import { availableMediaTypes, mediaTypes } from './media-types';
import type { AvailablePictureFormatName } from './picture-formats';
import { availablePictureFormats } from './picture-formats';

import { plainToInstance } from '#class-transformer';
import { Dto } from '#core/domain';

export class ProductDto extends Dto<ProductDto> {
  @IsString({ message: 'products.fields.id.IsString' })
  id!: string;

  @IsString({ message: 'products.fields.name.IsString' })
  name!: string;

  @IsString({ message: 'products.fields.description.IsString' })
  description!: string;

  @IsEnum(Object.keys(availableMediaTypes), {
    message: 'products.fields.mediaTypeName.IsEnum',
  })
  mediaTypeName!: AvailableMediaTypeName;
  @IsEnum(Object.keys(availablePictureFormats), {
    message: 'products.fields.pictureFormatName.IsEnum',
  })
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
