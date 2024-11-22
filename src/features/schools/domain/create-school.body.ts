import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { AvailableCurrency } from './school.dto';

import { Dto } from '#core/domain';

export class CreateSchoolBody extends Dto<CreateSchoolBody> {
  @IsString({ message: 'schools.create.validation.name.IsString' })
  @IsNotEmpty({ message: 'schools.create.validation.name.IsNotEmpty' })
  @MaxLength(100, { message: 'schools.create.validation.name.MaxLength' })
  @Transform(({ value }) => value?.trim())
  name!: string;

  @IsEnum(AvailableCurrency, {
    message: 'schools.create.validation.currency.IsEnum',
  })
  @IsNotEmpty({ message: 'schools.create.validation.currency.IsNotEmpty' })
  @Transform(({ value }) => value?.trim().toUpperCase())
  currency!: AvailableCurrency;

  @IsString({ message: 'schools.create.validation.city.IsString' })
  @IsNotEmpty({ message: 'schools.create.validation.city.IsNotEmpty' })
  @MaxLength(100, { message: 'schools.create.validation.city.MaxLength' })
  city!: string;
}
