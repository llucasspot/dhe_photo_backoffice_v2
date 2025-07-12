import { OmitType } from '@domain/core';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

import { SchoolModel } from '../models';

import { SchoolAddressDto } from './address.dto';
import { SchoolBankAccountDto } from './bank-account.dto';
import { SchoolProjectDto } from './project.dto';

export class SchoolDto extends OmitType(SchoolModel, []) {
  @IsOptional()
  @ValidateNested()
  @Type(() => SchoolAddressDto)
  address?: SchoolAddressDto;

  @IsArray()
  @IsOptional({ each: true })
  @ValidateNested({ each: true })
  @Type(() => SchoolAddressDto)
  bankAccounts?: SchoolBankAccountDto[];

  @IsArray()
  @IsOptional({ each: true })
  @ValidateNested({ each: true })
  @Type(() => SchoolProjectDto)
  projects?: SchoolProjectDto[];
}
