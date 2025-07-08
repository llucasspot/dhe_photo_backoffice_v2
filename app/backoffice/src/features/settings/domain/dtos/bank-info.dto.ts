import { IsIBAN, IsNotEmpty, IsString, Matches } from 'class-validator';

import { plainToInstance, Transform } from '#class-transformer';
import { Dto } from '#core/domain';

export class BankInfoDto extends Dto<BankInfoDto> {
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
  bicNumber!: string;

  static build<TBody>(body: TBody[]): BankInfoDto[];
  static build<TBody>(body: TBody): BankInfoDto;
  static build(body: unknown): BankInfoDto | BankInfoDto[] {
    return plainToInstance(this, body);
  }
}
