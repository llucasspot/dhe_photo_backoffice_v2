import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { Transform } from '#class-transformer';
import { Dto } from '#core/domain';

export class PersonalInfoDto extends Dto<PersonalInfoDto> {
  @IsEmail(
    {},
    { message: 'settings.personalInfo.form.input.email.validation.IsEmail' },
  )
  @IsNotEmpty({
    message:
      'settings.personalInfo.form.input.email.validation.email.IsNotEmpty',
  })
  email!: string;

  @IsString({
    message: 'settings.personalInfo.form.input.firstName.validation.IsString',
  })
  @Length(2, 50, {
    message: 'settings.personalInfo.form.input.firstName.validation.Length',
  })
  @Matches(/^[a-zA-Z\s-]+$/, {
    message: 'settings.personalInfo.form.input.firstName.validation.Matches',
  })
  @Transform(({ value }) => value?.trim())
  firstName!: string;

  @IsString({
    message: 'settings.personalInfo.form.input.lastName.validation.IsString',
  })
  @Length(2, 50, {
    message: 'settings.personalInfo.form.input.lastName.validation.Length',
  })
  @Matches(/^[a-zA-Z\s-]+$/, {
    message: 'settings.personalInfo.form.input.lastName.validation.Matches',
  })
  @Transform(({ value }) => value?.trim())
  lastName!: string;

  @IsString({
    message: 'settings.personalInfo.form.input.displayName.validation.IsString',
  })
  @Length(2, 50, {
    message: 'settings.personalInfo.form.input.displayName.validation.Length',
  })
  @Transform(({ value }) => value?.trim())
  displayName!: string;

  @IsPhoneNumber(undefined, {
    message:
      'settings.personalInfo.form.input.phoneNumber.validation.IsPhoneNumber',
  })
  @IsNotEmpty({
    message:
      'settings.personalInfo.form.input.phoneNumber.validation.IsNotEmpty',
  })
  phoneNumber!: string;
}
