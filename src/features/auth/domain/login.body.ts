import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { Dto } from '#core/domain';

export class LoginBody extends Dto<LoginBody> {
  @IsEmail({}, { message: 'auth.login.validation.email.IsEmail' })
  @IsNotEmpty({ message: 'auth.login.validation.email.IsNotEmpty' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  email!: string;

  @IsString({ message: 'auth.login.validation.password.IsString' })
  @Length(8, undefined, { message: 'auth.login.validation.password.Length' })
  @IsNotEmpty({ message: 'auth.login.validation.password.IsNotEmpty' })
  password!: string;
}
