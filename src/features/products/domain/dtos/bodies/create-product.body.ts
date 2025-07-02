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
  @IsString({})
  @IsNotEmpty({})
  @MaxLength(100, {})
  @Transform(({ value }) => value?.trim())
  name!: string;

  @IsString({})
  @MaxLength(200, {})
  @Transform(({ value }) => value?.trim())
  description!: string;

  @ValidateNested({})
  @Type(() => TemplateBody)
  template!: TemplateBody;
}
