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
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsString()
  @Length(2, 50, { message: 'First name must be between 2 and 50 characters' })
  @Matches(/^[a-zA-Z\s-]+$/, {
    message: 'First name can only contain letters, spaces, and hyphens',
  })
  @Transform(({ value }) => value?.trim())
  firstName!: string;

  @IsString()
  @Length(2, 50, { message: 'Last name must be between 2 and 50 characters' })
  @Matches(/^[a-zA-Z\s-]+$/, {
    message: 'Last name can only contain letters, spaces, and hyphens',
  })
  @Transform(({ value }) => value?.trim())
  lastName!: string;

  @IsString()
  @Length(2, 50, {
    message: 'Display name must be between 2 and 50 characters',
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
