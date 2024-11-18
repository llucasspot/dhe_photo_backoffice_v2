import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { Dto } from '#core/domain';

export class AddressDto extends Dto<AddressDto> {
  declare countryIsoCode: string;
  declare address1: string;
  declare postalCode: string;
  declare city: string;
}

export class BankInfoDto extends Dto<BankInfoDto> {
  declare iban: string;
  declare bicNumber: string;
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
  declare companyName: string;
  declare vatNumber: string;
  declare subjectToVat: boolean;
}

export class UserSettingsDto extends Dto<UserSettingsDto> {
  declare personalInfo: PersonalInfoDto;
  declare companyInfo: CompanyInfoDto;
  declare address: AddressDto;
  declare bankInfo: BankInfoDto;
}
