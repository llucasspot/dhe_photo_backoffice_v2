import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { Transform } from '#class-transformer';
import { Dto } from '#core/domain';

export class CreateProductBody extends Dto<CreateProductBody> {
  @IsString({ message: 'products.create.validation.name.IsString' })
  @IsNotEmpty({ message: 'products.create.validation.name.IsNotEmpty' })
  @MaxLength(100, { message: 'products.create.validation.name.MaxLength' })
  @Transform(({ value }) => value?.trim())
  name!: string;

  @IsString({ message: 'products.create.validation.description.IsString' })
  @MaxLength(200, {
    message: 'products.create.validation.description.MaxLength',
  })
  @Transform(({ value }) => value?.trim())
  description!: string;

  @IsNumber({}, { message: 'products.create.validation.longSize.IsNumber' })
  @Min(1, { message: 'products.create.validation.longSize.Min' })
  @Transform(({ value }) => Number(value))
  longSize!: number;

  @IsNumber({}, { message: 'products.create.validation.shortSize.IsNumber' })
  @Min(1, { message: 'products.create.validation.shortSize.Min' })
  @Transform(({ value }) => Number(value))
  shortSize!: number;
}
