import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsIBAN,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  Length,
  Matches,
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

export class BankInfoDto extends Dto<BankInfoDto> {
  @IsString({ message: 'settings.bankInfo.validation.ibanRequired' })
  @IsIBAN({ message: 'settings.bankInfo.validation.ibanInvalid' })
  @IsNotEmpty({ message: 'settings.bankInfo.validation.ibanRequired' })
  @Transform(({ value }) => value?.trim().toUpperCase())
  iban!: string;

  @IsString({ message: 'settings.bankInfo.validation.bicRequired' })
  @IsNotEmpty({ message: 'settings.bankInfo.validation.bicRequired' })
  @Matches(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, {
    message: 'settings.bankInfo.validation.bicInvalid',
  })
  @Transform(({ value }) => value?.trim().toUpperCase())
  bicNumber!: string;
}

export class PersonalInfoDto extends Dto<PersonalInfoDto> {
  @IsEmail({}, { message: 'settings.personalInfo.validation.email.IsEmail' })
  @IsNotEmpty({ message: 'settings.personalInfo.validation.email.IsNotEmpty' })
  email!: string;

  @IsString({ message: 'settings.personalInfo.validation.firstName.IsString' })
  @Length(2, 50, {
    message: 'settings.personalInfo.validation.firstName.Length',
  })
  @Matches(/^[a-zA-Z\s-]+$/, {
    message: 'settings.personalInfo.validation.firstName.Matches',
  })
  @Transform(({ value }) => value?.trim())
  firstName!: string;

  @IsString({ message: 'settings.personalInfo.validation.lastName.IsString' })
  @Length(2, 50, {
    message: 'settings.personalInfo.validation.lastName.Length',
  })
  @Matches(/^[a-zA-Z\s-]+$/, {
    message: 'settings.personalInfo.validation.lastName.Matches',
  })
  @Transform(({ value }) => value?.trim())
  lastName!: string;

  @IsString({
    message: 'settings.personalInfo.validation.displayName.IsString',
  })
  @Length(2, 50, {
    message: 'settings.personalInfo.validation.displayName.Length',
  })
  @Transform(({ value }) => value?.trim())
  displayName!: string;

  @IsPhoneNumber(undefined, {
    message: 'settings.personalInfo.validation.phoneNumber.IsPhoneNumber',
  })
  @IsNotEmpty({
    message: 'settings.personalInfo.validation.phoneNumber.IsNotEmpty',
  })
  phoneNumber!: string;
}

export class CompanyInfoDto extends Dto<CompanyInfoDto> {
  @IsString({ message: 'settings.companyInfo.validation.companyName.IsString' })
  @IsNotEmpty({
    message: 'settings.companyInfo.validation.companyName.IsNotEmpty',
  })
  @MaxLength(100, {
    message: 'settings.companyInfo.validation.companyName.MaxLength',
  })
  @Transform(({ value }) => value?.trim())
  companyName!: string;

  @IsString({ message: 'settings.companyInfo.validation.vatNumber.IsString' })
  @IsOptional()
  @Matches(/^[A-Z]{2}[0-9A-Z]+$/, {
    message: 'settings.companyInfo.validation.vatNumber.Matches',
  })
  @Transform(({ value }) => value?.trim().toUpperCase())
  vatNumber?: string;

  @IsBoolean({
    message: 'settings.companyInfo.validation.subjectToVat.IsBoolean',
  })
  subjectToVat!: boolean;
}

export class UserSettingsDto extends Dto<UserSettingsDto> {
  declare personalInfo: PersonalInfoDto;
  declare companyInfo: CompanyInfoDto;
  declare address: AddressDto;
  declare bankInfo: BankInfoDto;
}
