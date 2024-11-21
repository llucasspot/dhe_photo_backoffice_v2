import { Transform } from 'class-transformer';
import { IsIBAN, IsNotEmpty, IsString, Matches } from 'class-validator';

import { Dto } from '#core/domain';

export class BankInfoDto extends Dto<BankInfoDto> {
  @IsString({ message: 'settings.bankInfo.validation.ibanRequired' })
  @IsIBAN({ message: 'settings.bankInfo.validation.ibanInvalid' })
  @IsNotEmpty({ message: 'settings.bankInfo.validation.ibanRequired' })
  @Transform(({ value }) => value?.trim().toUpperCase())
  iban!: string;

  @IsString({ message: 'settings.bankInfo.validation.bicRequired' })
  @IsNotEmpty({ message: 'settings.bankInfo.validation.bicRequired' })
  @Matches(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, {
    message: 'settings.bankInfo.validation.bicInvalid',
  })
  @Transform(({ value }) => value?.trim().toUpperCase())
  bicNumber!: string;
}
