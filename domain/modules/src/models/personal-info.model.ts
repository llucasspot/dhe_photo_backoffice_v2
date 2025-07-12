import { Model } from '@domain/core';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class PersonalInfoModel extends Model<PersonalInfoModel> {
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
