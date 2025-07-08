import { Dto } from '@domain/core';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { AvailableCurrency } from '../school.dto';

export class CreateSchoolBody extends Dto<CreateSchoolBody> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  name!: string;

  @IsEnum(AvailableCurrency)
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim().toUpperCase())
  currency!: AvailableCurrency;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city!: string;
}
