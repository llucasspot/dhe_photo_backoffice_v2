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
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @Length(2, 50)
  @Matches(/^[a-zA-Z\s-]+$/)
  @Transform(({ value }) => value?.trim())
  firstName!: string;

  @IsString()
  @Length(2, 50)
  @Matches(/^[a-zA-Z\s-]+$/)
  @Transform(({ value }) => value?.trim())
  lastName!: string;

  @IsString()
  @Length(2, 50)
  @Transform(({ value }) => value?.trim())
  displayName!: string;

  @IsPhoneNumber(undefined)
  @IsNotEmpty()
  phoneNumber!: string;
}
