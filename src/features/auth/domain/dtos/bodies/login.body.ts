import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { Transform } from '#class-transformer';
import { Dto } from '#core/domain';

export class LoginBody extends Dto<LoginBody> {
  @IsEmail({}, { message: 'auth.login.form.input.email.validation.IsEmail' })
  @IsNotEmpty({ message: 'auth.login.form.input.email.validation.IsNotEmpty' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  email!: string;

  @IsString({ message: 'auth.login.form.input.password.validation.IsString' })
  @Length(8, undefined, {
    message: 'auth.login.form.input.password.validation.Length',
  })
  @IsNotEmpty({
    message: 'auth.login.form.input.password.validation.IsNotEmpty',
  })
  password!: string;
}
