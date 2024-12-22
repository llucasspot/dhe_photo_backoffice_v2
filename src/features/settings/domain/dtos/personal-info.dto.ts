import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { plainToInstance, Transform } from '#class-transformer';
import { Dto } from '#core/domain';

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

  static build<TBody>(body: TBody[]): PersonalInfoDto[];
  static build<TBody>(body: TBody): PersonalInfoDto;
  static build(body: unknown): PersonalInfoDto | PersonalInfoDto[] {
    return plainToInstance(this, body);
  }
}
