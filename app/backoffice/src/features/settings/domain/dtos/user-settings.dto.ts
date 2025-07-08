import { AddressDto } from './address.dto';
import { BankInfoDto } from './bank-info.dto';
import { CompanyInfoDto } from './company-info.dto';
import { PersonalInfoDto } from './personal-info.dto';

import { plainToInstance } from '#class-transformer';
import { Dto } from '#core/domain';

export class UserSettingsDto extends Dto<UserSettingsDto> {
  declare personalInfo: PersonalInfoDto;
  declare companyInfo: CompanyInfoDto;
  declare address: AddressDto;
  declare bankInfo: BankInfoDto;

  static build<TBody>(body: TBody[]): UserSettingsDto[];
  static build<TBody>(body: TBody): UserSettingsDto;
  static build(body: unknown): UserSettingsDto | UserSettingsDto[] {
    return plainToInstance(this, body);
  }
}
