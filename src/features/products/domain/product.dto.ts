import { IsEnum, IsString } from 'class-validator';

import type { AvailableMediaType, AvailableMediaTypeName } from './media-types';
import { availableMediaTypes, mediaTypes } from './media-types';
import type {
  AvailablePictureFormat,
  AvailablePictureFormatName,
} from './picture-formats';
import { availablePictureFormats } from './picture-formats';

import { plainToInstance, Transform } from '#class-transformer';
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

  @Transform(({ obj }: { obj: ProductDto }) => mediaTypes[obj.mediaTypeName])
  mediaType!: AvailableMediaType;

  @IsEnum(Object.keys(availablePictureFormats), {
    message: 'products.fields.pictureFormatName.IsEnum',
  })
  pictureFormatName!: AvailablePictureFormatName;

  @Transform(
    ({ obj }: { obj: ProductDto }) =>
      availablePictureFormats[obj.pictureFormatName],
  )
  pictureFormat!: AvailablePictureFormat;

  static build<TBody>(body: TBody[]): ProductDto[];
  static build<TBody>(body: TBody): ProductDto;
  static build(body: unknown): ProductDto | ProductDto[] {
    return plainToInstance(this, body);
  }
}
