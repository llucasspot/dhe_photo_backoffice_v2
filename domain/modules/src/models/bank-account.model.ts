import { Model, OmitType } from '@domain/core';
import { Transform } from 'class-transformer';
import { IsIBAN, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

import { SchoolModel } from './school.model';

export class BankAccountModel extends Model<BankAccountModel> {
  @IsString()
  @IsNotEmpty()
  @IsIBAN()
  @Transform(({ value }) => value?.trim().toUpperCase())
  iban!: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 11)
  @Transform(({ value }) => value?.trim().toUpperCase())
  bic!: string;
}

export class UserBankAccountModel extends OmitType(BankAccountModel, []) {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  userId!: string;
}

export class SchoolBankAccountModel extends OmitType(BankAccountModel, []) {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  schoolId!: SchoolModel['id'];
}
