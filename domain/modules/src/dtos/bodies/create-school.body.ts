import { Dto } from '@domain/core';
import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { availableCurrencies, AvailableCurrency } from '../../models';

export class CreateSchoolBody extends Dto<CreateSchoolBody> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  name!: string;

  @IsIn(availableCurrencies)
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim().toUpperCase())
  currency!: AvailableCurrency;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city!: string;
}
