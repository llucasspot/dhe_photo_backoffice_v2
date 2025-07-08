import { Dto } from '@domain/core';
import { plainToInstance, Transform } from 'class-transformer';
import { IsIBAN, IsNotEmpty, IsString, Matches } from 'class-validator';

export class BankAccountDto extends Dto<BankAccountDto> {
  @IsString()
  id!: string;

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

  static build<TBody>(body: TBody[]): BankAccountDto[];
  static build<TBody>(body: TBody): BankAccountDto;
  static build(body: unknown): BankAccountDto | BankAccountDto[] {
    return plainToInstance(this, body);
  }
}
