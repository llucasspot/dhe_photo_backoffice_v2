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
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  street!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  state!: string;

  @IsString()
  @Length(2, 2)
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim().toUpperCase())
  countryIsoCode!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  address1!: string;

  @IsString()
  @IsNotEmpty()
  @IsPostalCode('FR')
  @Transform(({ value }) => value?.trim())
  postalCode!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Transform(({ value }) => value?.trim())
  city!: string;

  static build<TBody>(body: TBody[]): AddressDto[];
  static build<TBody>(body: TBody): AddressDto;
  static build(body: unknown): AddressDto | AddressDto[] {
    return plainToInstance(this, body);
  }
}
