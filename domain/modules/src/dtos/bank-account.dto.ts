import { OmitType } from '@domain/core';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import {
  BankAccountModel,
  SchoolBankAccountModel,
  UserBankAccountModel,
} from '../models';

import { SchoolDto } from './school.dto';

export class BankAccountDto extends OmitType(BankAccountModel, []) {}

export class SchoolBankAccountDto
  extends OmitType(SchoolBankAccountModel, [])
  implements BankAccountDto
{
  @IsOptional()
  @ValidateNested()
  @Type(() => SchoolDto)
  school?: SchoolDto;
}

export class UserBankAccountDto
  extends OmitType(UserBankAccountModel, [])
  implements BankAccountDto
{
  @IsOptional()
  @ValidateNested()
  // @Type(() => UserDto)
  user?: object;
}
