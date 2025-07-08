import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
  ValidateIf,
} from 'class-validator';

import { Transform } from '#class-transformer';
import { Dto } from '#core/domain';

export class RegisterBody extends Dto<RegisterBody> {
  @IsEmail({}, {})
  @IsNotEmpty({})
  @Transform(({ value }) => value?.trim().toLowerCase())
  email!: string;

  @IsString({})
  @Length(8, undefined, {})
  @IsNotEmpty({})
  password!: string;

  @ValidateIf((dto: RegisterBody) => dto.password !== undefined)
  @IsString({})
  @IsNotEmpty({})
  @Validate((dto: RegisterBody) => dto.confirmPassword === dto.password, {})
  confirmPassword!: string;
}
