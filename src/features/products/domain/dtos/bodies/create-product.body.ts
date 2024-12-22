import {
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { TemplateBody } from './template.body';

import { Transform, Type } from '#class-transformer';
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

  @ValidateNested()
  @Type(() => TemplateBody)
  template!: TemplateBody;
}
