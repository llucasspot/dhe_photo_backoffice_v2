import { IsIBAN, IsNotEmpty, IsString, Matches } from 'class-validator';

import { Transform } from '#class-transformer';
import { Dto } from '#core/domain';

export class AddSchoolBankAccountBody extends Dto<AddSchoolBankAccountBody> {
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
  bic!: string;
}
