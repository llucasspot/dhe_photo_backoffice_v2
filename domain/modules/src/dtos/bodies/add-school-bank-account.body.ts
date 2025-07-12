import { Dto } from '@domain/core';
import { Transform } from 'class-transformer';
import { IsIBAN, IsNotEmpty, IsString, Matches } from 'class-validator';

export class AddSchoolBankAccountBody extends Dto<AddSchoolBankAccountBody> {
  @IsString()
  @IsIBAN()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim().toUpperCase())
  iban!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/)
  @Transform(({ value }) => value?.trim().toUpperCase())
  bic!: string;
}
