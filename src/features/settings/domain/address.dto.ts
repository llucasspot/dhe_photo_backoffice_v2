import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsPostalCode,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

import { Dto } from '#core/domain';

export class AddressDto extends Dto<AddressDto> {
  @IsString({ message: 'settings.address.validation.countryIsoCode.IsString' })
  @Length(2, 2, {
    message: 'settings.address.validation.countryIsoCode.Length',
  })
  @IsNotEmpty({
    message: 'settings.address.validation.countryIsoCode.IsNotEmpty',
  })
  @Transform(({ value }) => value?.trim().toUpperCase())
  countryIsoCode!: string;

  @IsString({ message: 'settings.address.validation.address1.IsString' })
  @IsNotEmpty({ message: 'settings.address.validation.address1.IsNotEmpty' })
  @MaxLength(100, { message: 'settings.address.validation.address1.MaxLength' })
  @Transform(({ value }) => value?.trim())
  address1!: string;

  @IsString({ message: 'settings.address.validation.postalCode.IsString' })
  @IsNotEmpty({ message: 'settings.address.validation.postalCode.IsNotEmpty' })
  @IsPostalCode('FR', {
    message: 'settings.address.validation.postalCode.IsPostalCode',
  })
  @Transform(({ value }) => value?.trim())
  postalCode!: string;

  @IsString({ message: 'settings.address.validation.city.IsString' })
  @IsNotEmpty({ message: 'settings.address.validation.city.IsNotEmpty' })
  @MaxLength(50, { message: 'settings.address.validation.city.MaxLength' })
  @Transform(({ value }) => value?.trim())
  city!: string;
}
