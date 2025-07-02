import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { Transform } from '#class-transformer';
import { Dto } from '#core/domain';

export class LoginBody extends Dto<LoginBody> {
  @IsEmail({}, {})
  @IsNotEmpty({})
  @Transform(({ value }) => value?.trim().toLowerCase())
  email!: string;

  @IsString({})
  @Length(8, undefined, {})
  @IsNotEmpty({})
  password!: string;
}
