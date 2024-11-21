import { AddressDto } from './address.dto.ts';
import { BankInfoDto } from './bank-info.dto.ts';
import { CompanyInfoDto } from './company-info.dto.ts';
import { PersonalInfoDto } from './personal-info.dto.ts';

import { Dto } from '#core/domain';

export class UserSettingsDto extends Dto<UserSettingsDto> {
  declare personalInfo: PersonalInfoDto;
  declare companyInfo: CompanyInfoDto;
  declare address: AddressDto;
  declare bankInfo: BankInfoDto;
}
