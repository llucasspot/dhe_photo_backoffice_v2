import {
  IsNotEmpty,
  IsPostalCode,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

import { plainToInstance, Transform } from '#class-transformer';
import { Dto } from '#core/domain';

export class AddressDto extends Dto<AddressDto> {
  @IsString({
    message: 'settings.address.form.input.street.validation.IsString',
  })
  @IsNotEmpty({
    message: 'settings.address.form.input.street.validation.IsNotEmpty',
  })
  @MaxLength(100, {
    message: 'settings.address.form.input.street.validation.MaxLength',
  })
  street!: string;

  @IsString({
    message: 'settings.address.form.input.state.validation.IsString',
  })
  @IsNotEmpty({
    message: 'settings.address.form.input.state.validation.IsNotEmpty',
  })
  @MaxLength(100, {
    message: 'settings.address.form.input.state.validation.MaxLength',
  })
  state!: string;

  @IsString({
    message: 'settings.address.form.input.countryIsoCode.validation.IsString',
  })
  @Length(2, 2, {
    message: 'settings.address.form.input.countryIsoCode.validation.Length',
  })
  @IsNotEmpty({
    message: 'settings.address.form.input.countryIsoCode.validation.IsNotEmpty',
  })
  @Transform(({ value }) => value?.trim().toUpperCase())
  countryIsoCode!: string;

  @IsString({
    message: 'settings.address.form.input.address1.validation.IsString',
  })
  @IsNotEmpty({
    message: 'settings.address.form.input.address1.validation.IsNotEmpty',
  })
  @MaxLength(100, {
    message: 'settings.address.form.input.address1.validation.MaxLength',
  })
  @Transform(({ value }) => value?.trim())
  address1!: string;

  @IsString({
    message: 'settings.address.form.input.postalCode.validation.IsString',
  })
  @IsNotEmpty({
    message: 'settings.address.form.input.postalCode.validation.IsNotEmpty',
  })
  @IsPostalCode('FR', {
    message: 'settings.address.form.input.postalCode.validation.IsPostalCode',
  })
  @Transform(({ value }) => value?.trim())
  postalCode!: string;

  @IsString({ message: 'settings.address.form.input.city.validation.IsString' })
  @IsNotEmpty({
    message: 'settings.address.form.input.city.validation.IsNotEmpty',
  })
  @MaxLength(50, {
    message: 'settings.address.form.input.city.validation.MaxLength',
  })
  @Transform(({ value }) => value?.trim())
  city!: string;

  static build<TBody>(body: TBody[]): AddressDto[];
  static build<TBody>(body: TBody): AddressDto;
  static build(body: unknown): AddressDto | AddressDto[] {
    return plainToInstance(this, body);
  }
}
